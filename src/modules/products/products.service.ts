import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  products: any[] = [];
  id = 1;

  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    if (product === null) {
      throw new NotFoundException('El producto no se encontro');
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = new ProductEntity();
    newProduct.name = payload.name;
    newProduct.price = payload.price;
    newProduct.free = payload.free;
    newProduct.long_description = payload.longDescription;

    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    if (product === null) {
      throw new NotFoundException('El producto no se encontro');
    }

    product.name = payload.name;
    product.price = payload.price;
    product.free = payload.free;
    product.long_description = payload.longDescription;

    return this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
