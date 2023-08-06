import { Body, Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto';
// import { Request } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Post('new')
  async createNewArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }
}
