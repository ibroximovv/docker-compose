import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ example: 'example@gmail.com' })
    @IsEmail()
    email: string

    @ApiProperty({ example: 'kimdir' })
    @IsString()
    username: string

    @ApiProperty({ example: 'parol' })
    @IsString()
    password: string

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role: UserRole

    @ApiProperty({ example: '123456' })
    @IsString()
    otp: string
}
