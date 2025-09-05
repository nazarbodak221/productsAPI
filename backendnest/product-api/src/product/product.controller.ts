import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('api/products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(id: string) {
    return this.productService.findById(+id);
  }

  @Post()
  async save(@Body() productDto: ProductDto) {
    if (await this.productService.findByEmail(productDto.sku)) {
      throw new BadRequestException(
        'Product with sku: ' + productDto.sku + ' was already added.',
      );
    }
    return this.productService.create(productDto);
  }

  @Put(':id')
  async update(id: string, @Body() productDto: ProductDto) {
    return this.productService.update(+id, productDto);
  }

  @Delete(':id')
  async delete(id: string) {
    return this.productService.remove(+id);
  }
}
