import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Observable, from } from 'rxjs';

@Injectable()
export class MailService {
  transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('smtp.host'),
      port: configService.get('smtp.port'),
      secure: false,
      auth: {
        user: configService.get('smtp.user'),
        pass: configService.get('smtp.password'),
      },
    });
  }

  sendActivationMail(to: string, link: string): Observable<void> {
    const mailOptions = {
      from: this.configService.get('smtp.user'),
      to,
      subject: 'Activation ' + this.configService.get('clientUrl'),
      text: '',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f0f0f0; padding: 20px;">
          <div style="background-color: #ffffff; padding: 20px; border-radius: 5px;">
            <h1 style="color: #333333;">Activate Your Account</h1>
            <p style="color: #666666;">Click the button below to activate your account:</p>
            <a href="${link}" style="display: inline-block; background-color: #007bff; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px;">Activate Now</a>
          </div>
        </div>
      `,
    };

    return from(this.transporter.sendMail(mailOptions));
  }
}
