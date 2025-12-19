import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import session from 'express-session';
import { DataSource } from 'typeorm';
import { SessionEntity } from './shared/session.entity';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
    origin: configService.getOrThrow<string>('CORS_ORIGIN'),
  });

  app.use(
    session({
      name: 'session',
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      cookie: { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, secure: false },
      resave: false,
      saveUninitialized: true,
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );

  await app.listen(configService.getOrThrow<number>('PORT'), () =>
    console.log(configService.getOrThrow<number>('PORT')),
  );
}
bootstrap().catch((e) => console.log(e));
