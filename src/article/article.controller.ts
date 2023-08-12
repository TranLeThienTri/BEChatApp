import { MyGuards } from './../auth/guard/myjwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto';
import { GetUser } from 'src/auth/decorator';
// import { Request } from 'express';
@UseGuards(MyGuards)
@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('all') //example: /article/
  async getAllArticle() {
    return await this.articleService.getAllArticle();
  }

  @Get(':id') //example: /article/123
  async getArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.articleService.getArticleById(id);
  }

  @Get('')
  async getArticleOfUser(@GetUser('id') userId: number) {
    return await this.articleService.getArticleOfUser(userId);
  }
  @Post() //example: /article/
  async createNewArticle(
    @GetUser('id') userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articleService.createArticle(userId, createArticleDto);
  }

  @Put(':id') //example: /article/123
  async updateArticleById(
    @Param('id', ParseIntPipe) articleId: number, //validate noteId is "number"
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articleService.UpdateArticleById(
      articleId,
      updateArticleDto,
    );
  }

  @Delete() //example: /article?id=1
  async deleteArticleById(@Query('id', ParseIntPipe) id: number) {
    return await this.articleService.DeleteArticleById(id);
  }
}
