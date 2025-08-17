import {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, TABLES } from './db.config';
import {
  combineResults,
  evaluateSection1,
  evaluateSection2Experience,
  evaluateSection2Transactions,
  QuestionnaireResponse
} from './question.model';
import { v4 as uuidv4 } from 'uuid';

interface EvaluationResultResponse {
  // response: QuestionnaireResponse;
  evaluation: {
    result: 'Pass' | 'Warning' | 'Fail';
    section1Result: 'Pass' | 'Fail';
    experienceResult: 'Pass' | 'Warning' | 'Fail';
    transactionResult: 'Pass' | 'Warning' | 'Fail';
    warningMessage?: string;
    evaluation: {
      section1: {
        result: 'Pass' | 'Fail';
        details: Array<{
          question: number;
          answer: string;
          pass: boolean;
        }>;
      };
      section2: {
        experience: {
          result: 'Pass' | 'Warning' | 'Fail';
          answers: string[];
        };
        transactions: {
          result: 'Pass' | 'Warning' | 'Fail';
          answers: string[];
        };
      };
    };
  };
}

export class QuestionnaireService {
  async saveQuestionnaireResponse(
    response: Omit<QuestionnaireResponse, 'id' | 'submittedAt'>
  ): Promise<QuestionnaireResponse> {
    const id = uuidv4();
    const submittedAt = new Date().toISOString();

    const questionnaireResponse: QuestionnaireResponse = {
      id,
      ...response,
      submittedAt
    };

    const params = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES,
      Item: questionnaireResponse
    };

    try {
      await dynamoDbClient.send(new PutCommand(params));
      return questionnaireResponse;
    } catch (error) {
      console.error('Error saving questionnaire response:', error);
      throw new Error('Failed to save questionnaire response');
    }
  }

  async getQuestionnaireResponse(address: string): Promise<QuestionnaireResponse | null> {
    const params = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES,
      KeyConditionExpression: 'account_address = :address',
      ExpressionAttributeValues: {
        ':address': address
      },
      ScanIndexForward: false, // Get most recent first (descending order by sort key)
      Limit: 1
    };

    try {
      const result = await dynamoDbClient.send(new QueryCommand(params));
      return (result.Items?.[0] as QuestionnaireResponse) || null;
    } catch (error) {
      console.error('Error getting questionnaire response:', error);
      throw new Error('Failed to get questionnaire response');
    }
  }

  async getAllQuestionnaireResponses(): Promise<QuestionnaireResponse[]> {
    const params = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES
    };

    try {
      const result = await dynamoDbClient.send(new ScanCommand(params));
      return (result.Items as QuestionnaireResponse[]) || [];
    } catch (error) {
      console.error('Error getting all questionnaire responses:', error);
      throw new Error('Failed to get questionnaire responses');
    }
  }

  async getResponsesByUser(userId: string): Promise<QuestionnaireResponse[]> {
    const params = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES,
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    };

    try {
      const result = await dynamoDbClient.send(new ScanCommand(params));
      return (result.Items as QuestionnaireResponse[]) || [];
    } catch (error) {
      console.error('Error getting responses by user:', error);
      throw new Error('Failed to get user responses');
    }
  }

  async updateQuestionnaireResponse(
    address: string,
    updates: Partial<Omit<QuestionnaireResponse, 'id' | 'submittedAt'>>
  ): Promise<QuestionnaireResponse | null> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    if (updates.questions) {
      updateExpressions.push('#questions = :questions');
      expressionAttributeNames['#questions'] = 'questions';
      expressionAttributeValues[':questions'] = updates.questions;
    }

    if (updates.completedAt) {
      updateExpressions.push('#completedAt = :completedAt');
      expressionAttributeNames['#completedAt'] = 'completedAt';
      expressionAttributeValues[':completedAt'] = updates.completedAt;
    }

    if (updates.userId) {
      updateExpressions.push('#userId = :userId');
      expressionAttributeNames['#userId'] = 'userId';
      expressionAttributeValues[':userId'] = updates.userId;
    }

    if (updateExpressions.length === 0) {
      throw new Error('No valid updates provided');
    }

    const params = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES,
      Key: { account_address: address },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW' as const
    };

    try {
      const result = await dynamoDbClient.send(new UpdateCommand(params));
      return (result.Attributes as QuestionnaireResponse) || null;
    } catch (error) {
      console.error('Error updating questionnaire response:', error);
      throw new Error('Failed to update questionnaire response');
    }
  }

  async evaluateQuestionnaireResponse(address: string): Promise<EvaluationResultResponse> {
    // Get the existing response
    const response = await this.getQuestionnaireResponse(address);

    if (!response) {
      throw new Error('Questionnaire response not found');
    }

    // Split questions into sections based on the structure
    const section1Questions = response.questions.slice(0, 5);
    const experienceQuestions = response.questions.slice(5, 8);
    const transactionQuestions = response.questions.slice(8, 11);

    // Evaluate Section 1
    const section1Result = evaluateSection1(section1Questions);

    // Extract answers for Section 2
    const experienceAnswers = experienceQuestions.map(
      q => q.answers[q.selectedAnswer ?? 0] ?? ''
    );
    const transactionAnswers = transactionQuestions.map(
      q => q.answers[q.selectedAnswer ?? 0] ?? ''
    );

    // Evaluate Section 2
    const experienceResult = evaluateSection2Experience(experienceAnswers);
    const transactionResult = evaluateSection2Transactions(transactionAnswers);

    // Combine results
    const overallResult = combineResults(section1Result, experienceResult, transactionResult);

    // Update the database record with evaluation results
    const updateExpressions: string[] = [
      '#result = :result',
      '#section1Result = :section1Result',
      '#section2Result = :section2Result',
      '#completedAt = :completedAt'
    ];

    const expressionAttributeNames: Record<string, string> = {
      '#result': 'result',
      '#section1Result': 'section1Result',
      '#section2Result': 'section2Result',
      '#completedAt': 'completedAt'
    };

    const expressionAttributeValues: Record<string, any> = {
      ':result': overallResult,
      ':section1Result': section1Result,
      ':section2Result': `Experience: ${experienceResult}, Transactions: ${transactionResult}`,
      ':completedAt': new Date().toISOString()
    };

    const updateParams = {
      TableName: TABLES.QUESTIONNAIRE_RESPONSES,
      Key: {
        account_address: response.account_address,
        id: response.id!
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW' as const
    };

    try {
      const result = await dynamoDbClient.send(new UpdateCommand(updateParams));
      const updatedResponse = result.Attributes as QuestionnaireResponse;

      // Prepare response based on result
      let warningMessage: string | undefined;
      if (overallResult === 'Warning') {
        warningMessage =
          'Based on your answers, we believe investment into real estate via the realxmarket app might not be right for you. If you still wish to proceed, please confirm that you understand this and that you are happy to go ahead regardless. If you are in any doubt as to whether to proceed, you should seek financial advice before doing so';
      }

      return {
        // response: updatedResponse,
        evaluation: {
          result: overallResult,
          section1Result,
          experienceResult,
          transactionResult,
          ...(warningMessage && { warningMessage }),
          evaluation: {
            section1: {
              result: section1Result,
              details: section1Questions.map((q, index) => ({
                question: index + 1,
                answer: q.answers[q.selectedAnswer ?? 0] ?? '',
                pass: q.selectedAnswer === 0
              }))
            },
            section2: {
              experience: {
                result: experienceResult,
                answers: experienceAnswers
              },
              transactions: {
                result: transactionResult,
                answers: transactionAnswers
              }
            }
          }
        }
      };
    } catch (error) {
      console.error('Error evaluating questionnaire response:', error);
      throw new Error('Failed to evaluate questionnaire response');
    }
  }
}

export const questionnaireService = new QuestionnaireService();
