import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as express from 'express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  // app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());

  const config = new DocumentBuilder()
    .setTitle('App chat APIs')
    .setDescription(
      'List APIs for app chat realtime by tnydevdocs and thanh tong',
    )
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('User')
    .addTag('Article')
    .addTag('Upload-file')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(join(__dirname, '../../uploads')); //thêm này cho phần static file
  app.useStaticAssets(join(__dirname, '../../uploads')); //thêm này cho phần static file
  await app.listen(3000);
}
bootstrap();
