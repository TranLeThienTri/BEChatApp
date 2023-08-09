import { GetUser } from '../auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from './upload-image.service';
import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { MyGuards } from '../auth/guard';

@UseGuards(MyGuards)
@Controller('upload-image')
export class UploadImageController {
  constructor(private uploadImageService: UploadImageService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname.split('.')[0];
          const fileExtention = file.originalname.split('.')[1];
          const newFileName =
            fileName.split(' ').join('_') +
            '_' +
            Date.now() +
            '.' +
            fileExtention;
          cb(null, newFileName);
        },
      }),
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadPhoto(
    @GetUser('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('File input is not image');
    return await this.uploadImageService.uploadImage(id, file);
  }
  // @Get()
}
