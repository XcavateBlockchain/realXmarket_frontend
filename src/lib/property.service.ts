import {
  PutCommand,
  GetCommand,
  ScanCommand,
  UpdateCommand,
  QueryCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { dynamoDbClient, TABLES } from './db.config';
import {
  Property,
  CreatePropertyRequest,
  UpdatePropertyRequest,
  PropertyQueryFilters
} from './property.model';
import { v4 as uuidv4 } from 'uuid';

export class PropertyService {
  async createProperty(request: CreatePropertyRequest): Promise<Property> {
    const id = uuidv4();
    const now = new Date().toISOString();
    const propertyId = Date.now(); // Generate unique property ID

    const property: Property = {
      id,
      propertyId,
      accountAddress: request.accountAddress,
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      information: {
        ...request.information,
        floor_plan: undefined,
        sales_agreement: undefined,
        property_images: []
      },
      pricing: {
        number_of_tokens: 0,
        price_per_token: 0,
        property_price: 0,
        estimated_rental_income: 0
      },
      features: {
        area: '',
        quality: '',
        outdoor_space: '',
        no_of_Bedrooms: 0,
        construction_date: '',
        no_of_bathrooms: 0,
        Off_street_parking: '',
        property_description: '',
        property_development_Code: '',
        title_deed_number: '',
        property_images: []
      },
      files: []
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

  async getProperty(propertyId: number, accountAddress: string): Promise<Property | null> {
    const params = {
      TableName: TABLES.PROPERTIES,
      Key: {
        propertyId,
        accountAddress
      }
    };

    try {
      const result = await dynamoDbClient.send(new GetCommand(params));
      return (result.Item as Property) || null;
    } catch (error) {
      console.error('Error getting property:', error);
      throw new Error('Failed to get property');
    }
  }

  async getPropertiesByAccount(accountAddress: string): Promise<Property[]> {
    const params = {
      TableName: TABLES.PROPERTIES,
      KeyConditionExpression: 'accountAddress = :accountAddress',
      ExpressionAttributeValues: {
        ':accountAddress': accountAddress
      }
    };

    try {
      const result = await dynamoDbClient.send(new QueryCommand(params));
      return (result.Items as Property[]) || [];
    } catch (error) {
      console.error('Error getting properties by account:', error);
      throw new Error('Failed to get properties by account');
    }
  }

  async getAllProperties(filters?: PropertyQueryFilters): Promise<Property[]> {
    let filterExpression = '';
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    if (filters) {
      const conditions: string[] = [];

      if (filters.accountAddress) {
        conditions.push('#accountAddress = :accountAddress');
        expressionAttributeNames['#accountAddress'] = 'accountAddress';
        expressionAttributeValues[':accountAddress'] = filters.accountAddress;
      }

      if (filters.propertyType) {
        conditions.push('#propertyType = :propertyType');
        expressionAttributeNames['#propertyType'] = 'information.property_type';
        expressionAttributeValues[':propertyType'] = filters.propertyType;
      }

      if (filters.minPrice !== undefined) {
        conditions.push('#propertyPrice >= :minPrice');
        expressionAttributeNames['#propertyPrice'] = 'pricing.property_price';
        expressionAttributeValues[':minPrice'] = filters.minPrice;
      }

      if (filters.maxPrice !== undefined) {
        conditions.push('#propertyPrice <= :maxPrice');
        expressionAttributeNames['#propertyPrice'] = 'pricing.property_price';
        expressionAttributeValues[':maxPrice'] = filters.maxPrice;
      }

      if (filters.status) {
        conditions.push('#status = :status');
        expressionAttributeNames['#status'] = 'status';
        expressionAttributeValues[':status'] = filters.status;
      }

      if (conditions.length > 0) {
        filterExpression = conditions.join(' AND ');
      }
    }

    const params: any = {
      TableName: TABLES.PROPERTIES
    };

    if (filterExpression) {
      params.FilterExpression = filterExpression;
      params.ExpressionAttributeNames = expressionAttributeNames;
      params.ExpressionAttributeValues = expressionAttributeValues;
    }

    try {
      const result = await dynamoDbClient.send(new ScanCommand(params));
      return (result.Items as Property[]) || [];
    } catch (error) {
      console.error('Error getting all properties:', error);
      throw new Error('Failed to get properties');
    }
  }

  async updateProperty(
    propertyId: number,
    accountAddress: string,
    updates: UpdatePropertyRequest
  ): Promise<Property | null> {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    // Add updatedAt timestamp
    updateExpressions.push('#updatedAt = :updatedAt');
    expressionAttributeNames['#updatedAt'] = 'updatedAt';
    expressionAttributeValues[':updatedAt'] = new Date().toISOString();

    // Handle information updates
    if (updates.information) {
      Object.entries(updates.information).forEach(([key, value]) => {
        if (value !== undefined) {
          const attrName = `#info_${key}`;
          const attrValue = `:info_${key}`;
          updateExpressions.push(`${attrName} = ${attrValue}`);
          expressionAttributeNames[attrName] = `information.${key}`;
          expressionAttributeValues[attrValue] = value;
        }
      });
    }

    // Handle pricing updates
    if (updates.pricing) {
      Object.entries(updates.pricing).forEach(([key, value]) => {
        if (value !== undefined) {
          const attrName = `#pricing_${key}`;
          const attrValue = `:pricing_${key}`;
          updateExpressions.push(`${attrName} = ${attrValue}`);
          expressionAttributeNames[attrName] = `pricing.${key}`;
          expressionAttributeValues[attrValue] = value;
        }
      });
    }

    // Handle features updates
    if (updates.features) {
      Object.entries(updates.features).forEach(([key, value]) => {
        if (value !== undefined) {
          const attrName = `#features_${key}`;
          const attrValue = `:features_${key}`;
          updateExpressions.push(`${attrName} = ${attrValue}`);
          expressionAttributeNames[attrName] = `features.${key}`;
          expressionAttributeValues[attrValue] = value;
        }
      });
    }

    // Handle status update
    if (updates.status) {
      updateExpressions.push('#status = :status');
      expressionAttributeNames['#status'] = 'status';
      expressionAttributeValues[':status'] = updates.status;
    }

    if (updateExpressions.length === 0) {
      throw new Error('No valid updates provided');
    }

    const params = {
      TableName: TABLES.PROPERTIES,
      Key: {
        propertyId,
        accountAddress
      },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW' as const
    };

    try {
      const result = await dynamoDbClient.send(new UpdateCommand(params));
      return (result.Attributes as Property) || null;
    } catch (error) {
      console.error('Error updating property:', error);
      throw new Error('Failed to update property');
    }
  }

  async addFileToProperty(
    propertyId: number,
    accountAddress: string,
    file: {
      fileKey: string;
      fileName: string;
      fileType: string;
      fileCategory: Property['files'][0]['fileCategory'];
    }
  ): Promise<Property | null> {
    const fileRecord = {
      ...file,
      uploadedAt: new Date().toISOString()
    };

    const params = {
      TableName: TABLES.PROPERTIES,
      Key: {
        propertyId,
        accountAddress
      },
      UpdateExpression:
        'SET #files = list_append(if_not_exists(#files, :empty_list), :file), #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#files': 'files',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: {
        ':file': [fileRecord],
        ':empty_list': [],
        ':updatedAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW' as const
    };

    try {
      const result = await dynamoDbClient.send(new UpdateCommand(params));
      return (result.Attributes as Property) || null;
    } catch (error) {
      console.error('Error adding file to property:', error);
      throw new Error('Failed to add file to property');
    }
  }

  async deleteProperty(propertyId: number, accountAddress: string): Promise<boolean> {
    const params = {
      TableName: TABLES.PROPERTIES,
      Key: {
        propertyId,
        accountAddress
      }
    };

    try {
      await dynamoDbClient.send(new DeleteCommand(params));
      return true;
    } catch (error) {
      console.error('Error deleting property:', error);
      throw new Error('Failed to delete property');
    }
  }

  async publishProperty(propertyId: number, accountAddress: string): Promise<Property | null> {
    return this.updateProperty(propertyId, accountAddress, { status: 'published' });
  }

  async archiveProperty(propertyId: number, accountAddress: string): Promise<Property | null> {
    return this.updateProperty(propertyId, accountAddress, { status: 'archived' });
  }

  async markPropertyAsSold(
    propertyId: number,
    accountAddress: string
  ): Promise<Property | null> {
    return this.updateProperty(propertyId, accountAddress, { status: 'sold' });
  }
}

export const propertyService = new PropertyService();
