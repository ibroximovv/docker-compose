import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [AuthController],
  providers: [AuthService, MailService],
  imports: [JwtModule.register({
    global: true,
    secret: 'nima'
  }),
  CacheModule.register({
    isGlobal: true
  })
  ]
})
export class AuthModule {}
