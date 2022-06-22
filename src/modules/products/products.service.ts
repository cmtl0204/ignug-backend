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
    const newProduct = this.productRepository.create(payload);
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
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id);
  }
}
