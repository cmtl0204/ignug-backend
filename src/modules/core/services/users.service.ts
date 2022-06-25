import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@core/dto';
import { UserEntity } from '@core/entities';
import { CataloguesService } from '@core/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    newUser.bloodType = await this.catalogueService.findOne(
      payload.bloodTypeId,
    );
    const response = await this.userRepository.save(newUser);
    return await this.userRepository.save(response);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async update(id: number, data: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: 1,
      },
    });
    this.userRepository.merge(user, data);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
