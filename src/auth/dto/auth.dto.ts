/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  hashPassword: string;

  @IsNotEmpty()
  @IsString()
  userName: string;

  avatar: string;
  token: string;
  refreshToken: string;
  role: string;
  bio: string;
}
export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  hashPassword: string;
}
