import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  constructor(private prismaService: PrismaService) {}
  async createArticle() {
    return 'abv';
  }
}
