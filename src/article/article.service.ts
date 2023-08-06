import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}
  async createArticle(createArticleDto: CreateArticleDto) {
    try {
      const newArticle = await this.prismaService.post.create({
        data: {
          ...createArticleDto,
        },
      });
      return {
        msg: 'create article successfully',
        newArticle,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
