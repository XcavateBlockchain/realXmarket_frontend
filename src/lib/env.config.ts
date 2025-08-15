export const config = {
  // AWS Configuration
  aws: {
    region: 'eu-west-1',
    accessKey: process.env['XCAV_AWS_ACCESS_KEY']!,
    secretAccessKey: process.env['XCAV_AWS_SECRET_KEY']!
  },

  // DynamoDB Configuration
  dynamodb: {
    questionnaireTableName:
      process.env['REALXMARKET_QUESTIONNAIRE_TABLE_NAME'] ?? 'realxmarket-questionnaire',
    propertyTableName:
      process.env['REALXMARKET_PROPERTY_TABLE_NAME'] ?? 'realxmarket-properties'
  }
};
