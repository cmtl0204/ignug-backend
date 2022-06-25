import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@users/dto';
import { UserEntity } from '@users/entities';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);
    newUser.password = await Bcrypt.hash(payload.password, 10);
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
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException(`El usuario ${username} no existe`);
    }
    return user;
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
