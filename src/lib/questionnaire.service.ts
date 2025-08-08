import { PutCommand, GetCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, TABLES } from './db.config';
import { QuestionnaireResponse } from './question.model';
import { v4 as uuidv4 } from 'uuid';

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
      Key: { account_address: address }
    };

    try {
      const result = await dynamoDbClient.send(new GetCommand(params));
      return (result.Item as QuestionnaireResponse) || null;
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
}

export const questionnaireService = new QuestionnaireService();
