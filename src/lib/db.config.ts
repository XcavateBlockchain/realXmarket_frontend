import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { config } from './env.config';

const client = new DynamoDBClient({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretAccessKey
  }
});

export const dynamoDbClient = DynamoDBDocumentClient.from(client);

export const TABLES = {
  QUESTIONNAIRE_RESPONSES: config.dynamodb.questionnaireTableName
} as const;
