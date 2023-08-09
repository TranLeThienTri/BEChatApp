import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  fileName: string;
  @IsString()
  filePath: string;
  userId: number;
}
