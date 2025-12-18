import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { S3Controller } from './s3.controller';
import { S3Client } from '@aws-sdk/client-s3';

@Module({
  controllers: [S3Controller],
  providers: [
    S3Service,
    {
      provide: S3Client,
      useFactory: () =>
        new S3Client({
          region: 'us-east-1',
          endpoint: 'http://localhost:9000',
          forcePathStyle: true,
          credentials: {
            accessKeyId: 'minio',
            secretAccessKey: 'minio123',
          },
        }),
    },
  ],
})
export class S3Module {}
