'use server';

import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import * as dotenv from 'dotenv';
// dotenv.config();

const s3Client = new S3Client({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!
  }
});

export async function uploadFileToS3(
  accountAddress: string,
  propertyId: number,
  fieldName: string,
  fileName: string,
  fileType: string,
  formData: FormData
): Promise<string> {
  const fileKey = `${accountAddress}/${propertyId}/${fieldName}/${fileName}`;

  const file = formData.get(fieldName) as File;
  const fileBody = Buffer.from(await file.arrayBuffer());

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey,
    Body: fileBody,
    ContentType: fileType
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return fileKey;
}

export async function generatePresignedUrl(
  fileKey: string,
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileKey
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}
