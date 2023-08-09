import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { sessionConfig } from './auth/session';
import * as passport from 'passport';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Sử dụng cookie-parser middleware để xử lý cookie
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
