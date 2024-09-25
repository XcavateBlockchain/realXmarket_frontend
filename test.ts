import { addFileToProperty, fetchPropertiesWithFiles, upsertProperty } from '@/lib/dynamo';
import { uploadFileToS3, generatePresignedUrl } from '@/lib/s3';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function testFunctions() {
  const accountAddress = '5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5';
  const propertyId = 3;
  const propertyData = {
    propertyName: 'Test Property 3',
    address: '123 Test Street',
    city: 'UPDATED TEST CITY',
    postCode: '12345',
    files: []
  };

  try {
    console.log('--- Step 1: Uploading test file to S3 ---');

    // Read the file content from a local file (e.g., test-image.jpg)
    const filePath = 'QmaPV59rfYbcvBMBW561oPTvAwgbhLKFersMZMdGUrMDdn.png';
    const fieldName = 'document';
    const fileName = 'test-image.jpg';
    const fileType = 'image/jpeg';
    const fileBody = fs.readFileSync(filePath);
    const fileBlob = new Blob([fileBody], { type: 'application/octet-stream' });

    const file = new FormData();
    file.append(fieldName, fileBlob);

    // Upload the file to S3
    const fileKey = await uploadFileToS3(
      accountAddress,
      propertyId,
      fieldName,
      fileName,
      fileType,
      file
    );
    console.log('File uploaded to S3 with key:', fileKey);

    console.log('--- Step 2: Creating/updating the property in DynamoDB ---');

    // Insert or update the property in DynamoDB
    await upsertProperty(accountAddress, propertyId, propertyData);
    console.log('Property inserted/updated in DynamoDB:', propertyData);

    console.log('--- Step 3: Associating the uploaded file with the property ---');

    // Associate the uploaded file with the property in DynamoDB
    await addFileToProperty(accountAddress, propertyId, fileKey);
    console.log('File associated with property in DynamoDB');

    console.log('--- Step 4: Fetching properties and their associated files ---');

    // Fetch properties with the pre-signed URLs for associated files
    const propertiesWithFiles = await fetchPropertiesWithFiles(accountAddress);
    console.log(
      'Fetched properties with associated files:',
      JSON.stringify(propertiesWithFiles, null, 2)
    );
  } catch (error) {
    console.error('Error during test script execution:', error);
  }
}

// Run the test function
testFunctions().catch(console.error);
