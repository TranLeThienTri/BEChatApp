/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ArticleModule } from './article/article.module';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    ArticleModule,
    ChatModule,
  ],
})
export class AppModule {}
