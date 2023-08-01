import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
// import { MyGuards } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: AuthUserDto) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    return await this.authService.logout(user['id']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refreshToken(@GetUser() user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    return await this.authService.refreshToken(user.id, user.refreshToken);
  }
  @Post('verify')
  async verifyCode(
    @Body('email') email: string,
    @Body('verifycode') code: string,
  ) {
    return await this.authService.verifyCode(email, code);
  }
}
