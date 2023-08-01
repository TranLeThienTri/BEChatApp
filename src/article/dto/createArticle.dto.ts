import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export class NewArticleDto {
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
