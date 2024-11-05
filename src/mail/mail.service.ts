import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../users/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: User) {
    // Aktivatsiya uchun URL
    const url = `${process.env.API_URL}:${process.env.API_PORT}/api/users/activate/${user.activation_link}`;
    console.log('Activation URL:', url);

    try {
      // Xat yuborish
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Turizm App ga xush kelibsiz!',
        template: './confirm', // './confirm' shablon nomi, shablon fayli confirm.hbs bo'lishi kerak
        context: {
          full_name: user.full_name,
          url, // Aktivatsiya URL ni shablon ichida ishlatish
        },
      });
    } catch (error) {
      console.error('Email yuborishda xatolik:', error);
      throw new InternalServerErrorException('Email yuborishda xatolik!');
    }
  }
}
