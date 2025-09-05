import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(productDto: ProductDto): Promise<ProductDto> {
    const sku = productDto.sku;
    if (await this.prismaService.product.findUnique({ where: { sku } })) {
      throw new BadRequestException(
        'Product with sku: ' + productDto.sku + ' was already added.',
      );
    }
    return this.prismaService.product.create({ data: productDto });
  }

  async findAll(): Promise<ProductDto[]> {
    return this.prismaService.product.findMany();
  }

  async findById(id: number): Promise<ProductDto | null> {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  async findByEmail(sku: string): Promise<ProductDto | null> {
    return this.prismaService.product.findUnique({ where: { sku } });
  }

  async update(id: number, data: ProductDto): Promise<ProductDto> {
    return this.prismaService.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<ProductDto> {
    return this.prismaService.product.delete({ where: { id } });
  }
}
