import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  getOne() {
    return this.userRepository.findOne({
      where: {
        id: 1,
      },
    });
  }

  async create(data: any) {
    // const newUser = new User();
    // newUser.name = data.name;
    // newUser.lastname = data.lastname;
    // newUser.birthdate = data.birthdate;
    // newUser.age = data.age;
    // newUser.married = data.married;

    const newUser = this.userRepository.create(data);
    const response = await this.userRepository.save(newUser);
    console.log(response);
    return await this.userRepository.save(newUser);
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

  delete(id: number) {
    return this.userRepository.delete(id);
  }
}
