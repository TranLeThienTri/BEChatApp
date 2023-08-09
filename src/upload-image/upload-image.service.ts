import path from 'path';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class UploadImageService {
  constructor(private prismaService: PrismaService) {}
  async uploadImage(userId: number, file: Express.Multer.File) {
    // fs.writeFileSync('../../uploads', file.buffer);
    const createdFile = await this.prismaService.image.create({
      data: { filename: file.filename, filepath: file.path, userId },
    });
    return createdFile.filepath;
  }
}
