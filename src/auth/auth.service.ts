import { LoginUserDto } from './dto/auth.dto';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    public configService: ConfigService,
    private mailService: MailService,
    private authUserDto: AuthUserDto,
  ) {}

  async register(authUserDto: AuthUserDto) {
    const hashedPassword = await argon.hash(authUserDto.hashPassword);
    const verifycode = String(this.mailService.generateCode());
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...authUserDto,
          hashPassword: hashedPassword,
          verifycode: verifycode,
        },
      });
      // gửi mã xác thực tới email
      await this.mailService.sendMail(user.email, user.userName, verifycode);
      console.log('gui mail thanh cong');

      const accessToken = await this.generateAccessToken(user.id, user.email);
      const refreshToken = await this.generateRefreshToken(user.id, user.email);
      await this.updateToken(user, refreshToken);
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(verifycode);
      console.log(error);

      if (error.code === 'P2002') {
        throw new ForbiddenException('exists email');
      }
    }
  }

  //ĐĂNG NHẬP
  async login(loginUserDto: LoginUserDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new ForbiddenException('not found user');
    }
    const mathPassword = await argon.verify(
      user.hashPassword,
      loginUserDto.hashPassword,
    );

    if (!mathPassword) {
      throw new ForbiddenException('invalid password');
    }
    const accessToken = await this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id, user.email);
    await this.updateToken(user, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: number, rfToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ForbiddenException('not found user');
    }

    const rfMatches = rfToken === user.refreshToken;

    if (!rfMatches) {
      throw new ForbiddenException('refresh invalid');
    }
    const accessToken = await this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id, user.email);
    await this.updateToken(user, refreshToken);
    return { accessToken, refreshToken };
  }

  async generateAccessToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async generateRefreshToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.configService.get('JWT_SECRET_RF'),
    });
  }
  //thêm token vào db
  async updateToken(user: User, refreshToken: string) {
    const updateUser = await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: { refreshToken: refreshToken },
    });
    return null;
  }

  // LOGOUT
  async logout(userId: number) {
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: { refreshToken: null },
    });
    return {
      msg: 'Logged out',
    };
  }

  async verifyCode(email: string, code: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });
    if (!user) throw new ForbiddenException('not found user!!');

    const storeCode = user.verifycode;

    if (storeCode === code) {
      return true;
    }

    return false;
  }

  async deleteUser(user: User) {
    await this.prismaService.user.delete({
      where: {
        id: user.id,
      },
    });
  }
  // async updateRepeat(user: User, count: string) {
  //   await this.prismaService.user.update({
  //     where: {
  //       id: user.id,
  //     },
  //     data: {
  //       repeat: count,
  //     },
  //   });
  // }
}
