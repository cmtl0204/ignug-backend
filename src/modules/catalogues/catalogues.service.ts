import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { CatalogueEntity } from './entities/catalogue.entity';

@Injectable()
export class CataloguesService {
  constructor(
    @InjectRepository(CatalogueEntity)
    private repository: Repository<CatalogueEntity>,
  ) {}

  async create(payload: CreateCatalogueDto) {
    const newProduct = this.repository.create(payload);
    return await this.repository.save(newProduct);
  }

  async remove(id: number) {
    return await this.repository.softDelete(id);
  }

  async findAll() {
    return await this.repository.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const catalogue = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (catalogue === null) {
      throw new NotFoundException('El catalogo no se encontro');
    }

    return catalogue;
  }

  async update(id: number, payload: UpdateCatalogueDto) {
    const product = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (product === null) {
      throw new NotFoundException('El producto no se encontro');
    }

    this.repository.merge(product, payload);

    return this.repository.save(product);
  }
}
