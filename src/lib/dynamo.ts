'use server';
import { DynamoDBClient, ReturnValue } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  UpdateCommand,
  PutCommand,
  QueryCommand,
  GetCommand
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
  propertyData: Record<string, any>
) {
  const params = {
    TableName: 'real-marketplace-properties',
    Key: {
      accountAddress,
      propertyId
    },
    UpdateExpression:
      'SET ' +
      Object.keys(propertyData)
        .map((key, i) => `#${key} = :value${i}`)
        .join(', '),
    ExpressionAttributeNames: Object.keys(propertyData).reduce(
      (acc: Record<string, string>, key) => {
        acc[`#${key}`] = key;
        return acc;
      },
      {}
    ),
    ExpressionAttributeValues: Object.keys(propertyData).reduce(
      (acc: Record<string, any>, key, i) => {
        acc[`:value${i}`] = propertyData[key];
        return acc;
      },
      {}
    ),
    ReturnValues: ReturnValue.UPDATED_NEW
  };

  const command = new UpdateCommand(params);
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

export async function fetchPropertiesWithFiles(
  accountAddress: string,
  propertyId?: number // Optional propertyId
): Promise<any[]> {
  // Explicitly define the type for params to handle dynamic ExpressionAttributeValues
  let params: {
    TableName: string;
    KeyConditionExpression: string;
    ExpressionAttributeValues: Record<string, any>; // Use Record to allow dynamic keys
  } = {
    TableName: 'real-marketplace-properties',
    KeyConditionExpression: 'accountAddress = :accountAddress',
    ExpressionAttributeValues: {
      ':accountAddress': accountAddress
    }
  };

  // If propertyId is passed, add it to the KeyConditionExpression and ExpressionAttributeValues
  if (propertyId !== undefined) {
    params.KeyConditionExpression += ' AND propertyId = :propertyId';
    params.ExpressionAttributeValues[':propertyId'] = propertyId;
  }

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

export async function fetchProperty(accountAddress: string, propertyId: number) {
  const params = {
    TableName: 'real-marketplace-properties',
    Key: {
      accountAddress,
      propertyId
    }
  };

  try {
    const command = new GetCommand(params);
    const data = await ddbDocClient.send(command);
    return data.Item;
  } catch (err) {
    console.error('Error fetching property:', err);
    throw new Error(`Unable to fetch property with ID: ${propertyId}`);
  }
}
