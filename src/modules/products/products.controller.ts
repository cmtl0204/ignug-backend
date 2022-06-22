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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() params: any) {
    const response = this.productsService.findAll();

    return response;
    // return {
    //   data: response,
    //   message: `index`,
    // };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    const response = this.productsService.findOne(id);
    return response;
    // return {
    //   data: response,
    //   message: `show`,
    // };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    const response = this.productsService.create(payload);
    return response;
    // return {
    //   data: response,
    //   message: `created`,
    // };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const response = this.productsService.update(id, payload);
    return response;
    // return {
    //   data: response,
    //   message: `updated ${id}`,
    // };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.CREATED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const response = this.productsService.delete(id);
    return response;
    // return {
    //   data: response,
    //   message: `deleted`,
    // };
  }
}
