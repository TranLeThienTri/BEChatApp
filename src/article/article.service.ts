import { UpdateArticleDto } from './dto/update.article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}

  async getAllArticle(userId: number) {
    const articles = await this.prismaService.post.findMany({
      where: {
        userId,
      },
    });
    return articles;
  }

  async getArticleById(id: number) {
    try {
      const article = await this.prismaService.post.findFirst({
        where: {
          post_id: id,
        },
      });
      if (!article) throw new ForbiddenException(`Article ${id} not found`);
      return article;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async createArticle(userId: number, createArticleDto: CreateArticleDto) {
    try {
      const newArticle = await this.prismaService.post.create({
        data: {
          ...createArticleDto,
          userId,
        },
      });
      return newArticle;
    } catch (error) {
      console.log(error);
    }
  }
  async UpdateArticleById(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const article = await this.prismaService.post.findUnique({
        where: {
          post_id: id,
        },
      });
      if (!article)
        throw new ForbiddenException('not found article in database');
      return await this.prismaService.post.update({
        where: {
          post_id: id,
        },
        data: {
          ...updateArticleDto,
        },
      });
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
  async DeleteArticleById(id: number) {
    const article = await this.prismaService.post.findUnique({
      where: {
        post_id: id,
      },
    });
    if (!article) {
      throw new ForbiddenException('Cannot find article to delete');
    }
    return await this.prismaService.post.delete({
      where: {
        post_id: article.post_id,
      },
    });
  }
}
