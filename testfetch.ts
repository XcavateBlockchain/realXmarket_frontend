import {
  addFileToProperty,
  fetchPropertiesWithFiles,
  upsertProperty,
  fetchProperty
} from '@/lib/dynamo';
import { uploadFileToS3, generatePresignedUrl } from '@/lib/s3';
import fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

async function testFunctions() {
  const property = await fetchPropertiesWithFiles(
    '5FEda1GYvjMYcBiuRE7rb85QbD5bQNHuZajhRvHYTxm4PPz5'
  );
  console.log(property);
}

// Run the test function
testFunctions().catch(console.error);
