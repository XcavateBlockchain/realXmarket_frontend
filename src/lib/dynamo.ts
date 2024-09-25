'use server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  PutCommand,
  QueryCommand
} from '@aws-sdk/lib-dynamodb';
import { generatePresignedUrl } from './s3';
// import * as dotenv from 'dotenv';
// dotenv.config();

const ddbClient = new DynamoDBClient({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: process.env.XCAV_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.XCAV_AWS_SECRET_KEY!
  }
});
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export async function upsertProperty(
  accountAddress: string,
  propertyId: number,
  propertyData: any
) {
  const params = {
    TableName: 'real-marketplace-properties',
    Item: {
      accountAddress,
      propertyId,
      ...propertyData
    }
  };

  const command = new PutCommand(params);
  await ddbDocClient.send(command);
}

export async function addFileToProperty(
  accountAddress: string,
  propertyId: number,
  fileKey: string
) {
  const params = {
    TableName: 'real-marketplace-properties',
    Key: { accountAddress, propertyId },
    UpdateExpression: 'SET #files = list_append(if_not_exists(#files, :empty_list), :fileKey)',
    ExpressionAttributeNames: {
      '#files': 'files'
    },
    ExpressionAttributeValues: {
      ':fileKey': [fileKey],
      ':empty_list': []
    }
  };

  const command = new UpdateCommand(params);
  await ddbDocClient.send(command);
}

export async function fetchPropertiesWithFiles(accountAddress: string): Promise<any[]> {
  const params = {
    TableName: 'real-marketplace-properties',
    KeyConditionExpression: 'accountAddress = :accountAddress',
    ExpressionAttributeValues: {
      ':accountAddress': accountAddress
    }
  };

  const command = new QueryCommand(params);
  const data = await ddbDocClient.send(command);
  const properties = data.Items;

  // Generate pre-signed URLs for files
  const propertiesWithFiles = await Promise.all(
    (properties || []).map(async property => {
      if (property.files && property.files.length > 0) {
        const fileUrls = await Promise.all(
          property.files.map(async (fileKey: string) => await generatePresignedUrl(fileKey))
        );
        return { ...property, fileUrls };
      }
      return property;
    })
  );

  return propertiesWithFiles;
}
