import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async getCurrentUser(id: number) {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    delete currentUser.hashPassword;
    return currentUser;
  }

  async getUserById(id: number) {
    const idc = Number(id);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: idc,
      },
    });
    if (!user) throw new ForbiddenException('not found user in db');
    delete user.hashPassword;
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.prismaService.user.findMany();
    return users;
  }

  async getUserByName(name: string): Promise<User[]> {
    const users: User[] = await this.prismaService.user.findMany({
      where: {
        userName: {
          contains: name,
        },
      },
    });
    return users;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const nid = Number(id);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: nid,
      },
    });
    if (!user) throw new ForbiddenException('Not found user');
    const userUpdate = await this.prismaService.user.update({
      where: {
        id: nid,
      },
      data: {
        ...updateUserDto,
      },
    });
    return userUpdate;
  }

  async deleteUser(id: number) {
    const nid = Number(id);
    const deleteUser = await this.prismaService.user.delete({
      where: {
        id: nid,
      },
    });
    return deleteUser;
  }
}
