import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
  private S3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.accessKeyBucket,
      secretAccessKey: process.env.secretKeyBucket,
    },
  });

  async uploadFile(file: Express.Multer.File) {
    const key = file.originalname;
    const URL = `https://fr-nest-ocso-test.s3.us-east-1.amazonaws.com/${key}`;
    const Bucket = process.env.BucketName;
    const command = new PutObjectCommand({
      Key: key,
      Body: file.buffer,
      Bucket: Bucket,
    });
    await this.S3.send(command);
    return URL;
  }
}
