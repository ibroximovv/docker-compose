import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from "class-validator";

export class GetProductDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @IsInt()
    skip?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @IsInt()
    take?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    search?: string

    @ApiProperty({ required: false, enum: ['id', 'name', 'price'] })
    @IsOptional()
    @IsIn(['id', 'name', 'price'])
    sortBy?: 'id' | 'name' | 'price'

    @ApiProperty({ required: false, enum: ['asc', 'desc'] })
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc'

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    priceFrom?: number

    @ApiProperty({ required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    priceTo?: number
}