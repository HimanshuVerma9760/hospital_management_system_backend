import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.use('/payment/webhook', express.raw({ type: 'application/json' }));
  app.use(
    express.json({ limit: '10mb', type: ['application/json', 'text/plain'] }),
  );
  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  app.use(
    express.urlencoded({
      limit: '10mb',
      extended: true,
      type: 'application/x-www-form-urlencoded',
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
