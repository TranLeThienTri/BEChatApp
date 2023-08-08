/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
export class UpdateArticleDto {
  @IsString()
  @IsOptional()
  content?: string;
  @IsString()
  @IsOptional()
  hashTag?: string;
  @IsString()
  @IsOptional()
  image?: string;
}
