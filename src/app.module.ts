import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { UploadImageService } from './upload-image/upload-image.service';
import { UploadImageModule } from './upload-image/upload-image.module';
import { UploadImageController } from './upload-image/upload-image.controller';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    ArticleModule,
    UploadImageModule,
  ],
  controllers: [AppController, UploadImageController],
  providers: [AppService, UploadImageService],
})
export class AppModule {}
