import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsString, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'nimadir' })
    @IsString()
    name: string

    @ApiProperty({ example: 1213 }) 
    @Type(() => Number)
    @Min(1000)
    @IsInt()
    price: number
}
