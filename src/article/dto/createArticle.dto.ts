/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  userId: number;
}
