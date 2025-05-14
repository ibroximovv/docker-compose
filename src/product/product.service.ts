import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductDto } from './dto/get-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService){}
  async create(createProductDto: CreateProductDto) {
    try {
      const findPrd = await this.prisma.product.findFirst({ where: { name: createProductDto.name }})
      if (findPrd) throw new BadRequestException('prd already exists')
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findAll(query: GetProductDto) {
    const { search, skip = 1, take = 10, sortBy = 'id', sortOrder = 'desc', priceFrom, priceTo } = query
    try {
      return await this.prisma.product.findMany({
        where: {
          ...(search && {
            name: {
              contains: search,
              mode: 'insensitive'
            }
          }),
          ...(priceFrom !== undefined || priceTo !== undefined ?
            {
              price: {
                ...(priceFrom !== undefined && { gte: Number(priceFrom) }),
                ...(priceTo !== undefined && { lte: Number(priceTo) })
              }
            }: {}
          )
        },
        skip: (Number(skip) - 1) * Number(take),
        take: Number(take),
        orderBy: {
          [sortBy]: sortOrder
        }
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async findOne(id: number) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      return findone;
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      const findPrd = await this.prisma.product.findFirst({ where: { name: updateProductDto.name }})
      if (findPrd) throw new BadRequestException('prd already exists')
      return await this.prisma.product.update({ where: { id }, data: updateProductDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }

  async remove(id: number) {
    try {
      const findone = await this.prisma.product.findFirst({ where: { id }})
      if (!findone) throw new BadRequestException('Product not found')
      return await this.prisma.product.delete({ where: { id }});
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server Error')
    }
  }
}
