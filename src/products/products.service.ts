import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  products: any[] = [];
  id = 1;

  getAll() {
    return this.products;
  }

  getOne(id: number) {
    const product = this.products.find((product) => product.id == id);
    if (product == undefined) {
      throw new NotFoundException('El producto no se encontro');
    }

    return product;
  }

  filter(search: string) {
    const products = this.products.filter((product) => product.name == search);
    return products;
  }

  create(payload: CreateProductDto) {
    const data = {
      id: this.id,
      name: payload.name,
      price: payload.price,
      free: payload.free,
    };
    this.id++;
    this.products.push(data);
    return data;
  }

  update(id: number, payload: UpdateProductDto) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index == -1) {
      throw new NotFoundException('El producto no se encontro');
    }
    this.products[index]['name'] = payload.name;
    this.products[index]['price'] = payload.price;
    this.products[index]['free'] = payload.free;
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((product) => product.id == id);
    if (index == -1) {
      throw new NotFoundException('El producto no se encontro');
    }
    this.products.splice(index, 1);
    return true;
  }
}
