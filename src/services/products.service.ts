import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getAll() {
    return 'todos los products';
  }

  getOne() {
    return 'un producto';
  }

  filter() {
    return 'productos filtrados';
  }

  create() {
    return 'producto creado';
  }

  update() {
    return 'producto actualizado';
  }

  delete() {
    return 'producto eliminado';
  }
}
