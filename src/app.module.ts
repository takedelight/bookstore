import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SessionEntity } from './shared/session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DATABASE_HOST'),
        port: Number(config.getOrThrow('DATABASE_PORT')),
        username: config.getOrThrow('DATABASE_USER'),
        password: config.getOrThrow('DATABASE_PASSWORD'),
        database: config.getOrThrow('DATABASE_NAME'),
        entities: [SessionEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    S3Module,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
