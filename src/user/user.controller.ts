import { UserService } from './user.service';
// import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { MyGuards } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UpdateUserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';

@Controller('user')
@UseGuards(MyGuards)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('upload-file')
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
    await this.userService.uploadImage(id, file);
    return `http://localhost:3000/user/pictures/${file.filename}`;
  }

  @Get('/pictures/:filename')
  async getImage(@Param('filename') filename: any, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
  @Get('me')
  me(@GetUser('id') id: number) {
    return this.userService.getCurrentUser(id);
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get('name')
  getUserByName(@Body('name') name: string) {
    return this.userService.getUserByName(name);
  }

  // tại sao cái này cần bỏ ở dưới cùng??
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // @Patch(':id')
  // updateUserImage(@Param('id') id: number, @Body() imageID: number) {
  //   return this.userService.updateUserImage(id, imageID);
  // }

  @Delete(':id')
  deleteUser(@Param('id') id: any) {
    return this.userService.deleteUser(id);
  }
}
