import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginAuthDto {
    @ApiProperty({ example: 'example@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'parol' })
    @IsString()
    password: string
}