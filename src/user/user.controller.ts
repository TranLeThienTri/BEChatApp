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
  ParseIntPipe,
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
  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }
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
    return await this.userService.uploadImage(id, file);
  }

  @Get('/pictures/:filename')
  async getImage(@Param('filename') filename: any, @Res() res: Response) {
    return res.sendFile(filename, { root: './uploads' });
  }

  @Get('me')
  async me(@GetUser('id') id: number) {
    return await this.userService.getCurrentUser(id);
  }

  @Get('name')
  async getUserByName(@Body('name') name: string) {
    return await this.userService.getUserByName(name);
  }

  // tại sao cái này cần bỏ ở dưới cùng??
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: any) {
    return await this.userService.deleteUser(id);
  }
}
