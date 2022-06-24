import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { CataloguesService } from '../catalogues/catalogues.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private userService: UsersService,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);

    newProduct.type = await this.catalogueService.findOne(payload.typeId);

    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['user', 'type'],
    });
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

  async remove(id: number) {
    return await this.productRepository.softDelete(id);
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
}
