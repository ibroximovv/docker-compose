import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService],
  imports: [JwtModule.register({
    global: true,
    secret: 'nima'
  })]
})
export class AuthModule {}
