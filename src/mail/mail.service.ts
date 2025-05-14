import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from "nodemailer";
@Injectable()
export class MailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'islomaka2323@gmail.com',
            pass: 'grtf zyfb vtxr kcdw'
        }
    })

    async sendSmsToEmail(email: string, subject: string, text: string, html?: string) {
        try {
            await this.transporter.sendMail({
                to: email,
                subject,
                text,
                html
            })
            return { message: 'successfully sendsms'}
        } catch (error) {
            throw new InternalServerErrorException(error.message || 'Internal server Error')
        }
    }
}
