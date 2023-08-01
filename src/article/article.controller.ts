import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { NewArticleDto } from './dto';
import { GetArticle } from './decorator';
import { Request } from 'express';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}
  @Post('new')
  async createNewArticle(@GetArticle() req: Request) {
    console.log(JSON.stringify(Object.keys(req)));
    return await this.articleService.createArticle();
  }
}
