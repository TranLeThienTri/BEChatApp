import { AuthUserDto } from './../auth/dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private authUserDto: AuthUserDto,
  ) {}

  async sendMail(email: string, name: string, token: string) {
    const url = `${token}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to App Chat Realtime! Confirm your Email',
        template: './confirmation', // `.hbs` extension is appended automatically
        context: {
          name: name,
          url,
        },
      });
      console.error('send mail successfully');
    } catch (error) {
      console.error('Error send mail ', error);
    }
  }

  generateCode(): number {
    const randomNum = Math.random() * 10000;
    const fourDigitNum = Math.floor(randomNum);
    return fourDigitNum;
  }
}
