import { UserService } from './user.service';
// import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MyGuards } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UpdateUserDto } from './dto';
@Controller('user')
@UseGuards(MyGuards)
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  me(@GetUser('id') id: number) {
    return this.userService.getCurrentUser(id);
  }

  @Get('getallusers')
  getAllUser() {
    return this.userService.getAllUsers();
  }

  @Get('getusersbynname')
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
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
