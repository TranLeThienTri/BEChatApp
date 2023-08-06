/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  hashTag: string;
  @IsString()
  image: string;
  @IsNumber()
  userId: number;
}
