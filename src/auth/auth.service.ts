import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { MailService } from 'src/mail/mail.service';
import { totp } from "otplib";
import * as bcrypt from "bcrypt";
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
totp.options = {
  step: 300
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly mail: MailService, private readonly jwt: JwtService){}
  async sendOtp(sendOtpDto: SendOtpDto){
    try {
      const findone = await this.prisma.user.findFirst({ where: { email: sendOtpDto.email }})
      if (findone) throw new BadRequestException('User already exists')
      const otp = totp.generate(sendOtpDto.email + 'asd')
      this.mail.sendSmsToEmail(sendOtpDto.email, 'bu tasdiqlash kodi haloyiq', 'kodni hech kimga berakormang', `${otp}`)
      return { otp }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async register(createAuthDto: CreateAuthDto){
    try {
      const findone = await this.prisma.user.findFirst({ where: { email: createAuthDto.email }})
      if (findone) throw new BadRequestException('User already exists')
      const matchOtp = totp.verify({ token: createAuthDto.otp, secret: createAuthDto.email + 'asd' })
      if (!matchOtp) throw new BadRequestException('otp not provided')
      const hashedPassword = bcrypt.hashSync(createAuthDto.password, 10)
      return await this.prisma.user.create({ data: {
        email: createAuthDto.email,
        password: hashedPassword,
        username: createAuthDto.username,
        role: createAuthDto.role
      }})
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const findone = await this.prisma.user.findFirst({ where: { email: loginAuthDto.email }})
      if (!findone) throw new BadRequestException('User not found')
      const matchPassword = bcrypt.compareSync(loginAuthDto.password, findone.password)
      if (!matchPassword) throw new BadRequestException('Password not provided')
      const token = this.jwt.sign({ id: findone.id, role: findone.role })
      return { token }
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

}
