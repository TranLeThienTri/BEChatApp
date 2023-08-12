/* eslint-disable prettier/prettier */
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  image?: string;
  userId: number;
}
