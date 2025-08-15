'use server';

import {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  QueryCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, TABLES } from './db.config';

import { v4 as uuidv4 } from 'uuid';
import { generatePresignedUrl, uploadFileToS3 } from './s3';
import { ReturnValue } from '@aws-sdk/client-dynamodb';
import { PROPERTY_STATUSES } from './validations/property-schema';

type Data = Record<string, any>;

export async function createProperty(address: string, data: Data): Promise<Data> {
  const propertyId = uuidv4();
  const createdAt = new Date().toISOString();
  const status = PROPERTY_STATUSES[0];

  const property = {
    id: uuidv4(),
    propertyId,
    accountAddress: address,
    status,
    ...data,
    createdAt,
    updatedAt: createdAt
  };

  const params = {
    TableName: TABLES.PROPERTIES,
    Item: property
  };

  try {
    await dynamoDbClient.send(new PutCommand(params));
    return property;
  } catch (error) {
    console.error('Error creating property:', error);
    throw new Error('Failed to create property');
  }
}

export async function addFileToProperty(
  accountAddress: string,
  propertyId: string,
  fileKey: string
) {
  const params = {
    TableName: TABLES.PROPERTIES,
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
  await dynamoDbClient.send(command);
}

export async function updateProperty(propertyId: string, accountAddress: string, data: Data) {
  const params = {
    TableName: TABLES.PROPERTIES,
    Key: {
      accountAddress,
      propertyId
    },
    UpdateExpression:
      'SET ' +
      Object.keys(data)
        .map((key, i) => `#${key} = :value${i}`)
        .join(', '),
    ExpressionAttributeNames: Object.keys(data).reduce((acc: Record<string, string>, key) => {
      acc[`#${key}`] = key;
      return acc;
    }, {}),
    ExpressionAttributeValues: Object.keys(data).reduce((acc: Record<string, any>, key, i) => {
      acc[`:value${i}`] = data[key];
      return acc;
    }, {}),
    ReturnValues: ReturnValue.UPDATED_NEW
  };

  try {
    const command = new UpdateCommand(params);
    await dynamoDbClient.send(command);
    return data;
  } catch (error) {
    console.error('Error updating property:', error);
    throw new Error('Failed to update property');
  }
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
    TableName: TABLES.PROPERTIES,
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
  const data = await dynamoDbClient.send(command);
  const properties = data.Items;

  // Generate pre-signed URLs for files
  const propertiesWithFiles = await Promise.all(
    (properties || []).map(async property => {
      if (property.files && property.files.length > 0) {
        const fileUrls = await Promise.all(
          property.files
            .filter((fileKey: string) => fileKey.split('/')[2] == 'property_image')
            .map(async (fileKey: string) => await generatePresignedUrl(fileKey))
        );
        return { ...property, fileUrls };
      }
      return property;
    })
  );

  return propertiesWithFiles;
}

/**
 * Fetches properties for all partners of a developer
 * @param developerAddress - The address of the developer to find partners for
 * @returns Array of properties from all partners of the developer
 */
export async function fetchPropertiesForDeveloperPartners(
  developerAddress: string
): Promise<any[]> {
  // Import the function to find developer by partner address
  const { findDeveloperByPartnerAddress } = await import('@/config/white-list');

  // Find the developer based on the partner address
  const developer = findDeveloperByPartnerAddress(developerAddress);

  if (!developer) {
    // If no developer found, return properties for just this address
    return await fetchPropertiesWithFiles(developerAddress);
  }

  // Get all partner addresses for this developer
  const partnerAddresses = developer.partners.map(
    partner => partner.whitelistedAccountAddress
  );

  // Add the current address if it's not already in the list
  if (!partnerAddresses.includes(developerAddress)) {
    partnerAddresses.push(developerAddress);
  }

  // Fetch properties for all partner addresses
  const allProperties = await Promise.all(
    partnerAddresses.map(address => fetchPropertiesWithFiles(address))
  );

  // Flatten the array and remove duplicates based on propertyId
  const flattenedProperties = allProperties.flat();
  const uniqueProperties = flattenedProperties.filter(
    (property, index, self) =>
      index === self.findIndex(p => p.propertyId === property.propertyId)
  );

  return uniqueProperties;
}
