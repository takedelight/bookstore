import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  constructor(private readonly s3: S3Client) {}

  async upload(bucket: string, key: string, buffer: Buffer, mimeType: string) {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      }),
    );

    return {
      key,
      url: `http://localhost:9000/${bucket}/${key}`,
    };
  }
}
