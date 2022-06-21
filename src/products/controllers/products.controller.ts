import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  index(@Query() params: any) {
    const response = this.productsService.getAll();

    return {
      data: response,
      message: `index`,
    };
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  filter(@Query('search') search: string) {
    return {
      data: search,
      message: `filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  show(@Param('id', ParseIntPipe) id: number) {
    const response = this.productsService.getOne(id);
    return {
      data: response,
      message: `show`,
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  store(@Body() payload: CreateProductDto) {
    const response = this.productsService.create(payload);
    return {
      data: response,
      message: `created`,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const response = this.productsService.update(id, payload);
    return {
      data: response,
      message: `updated ${id}`,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  destroy(@Param('id', ParseIntPipe) id: number) {
    const response = this.productsService.delete(id);
    return {
      data: response,
      message: `deleted`,
    };
  }
}
