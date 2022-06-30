import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { CataloguesService } from '@core/services';

// import { CataloguesService } from '@core/services';

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

  async update(id: number, data: any) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    this.userRepository.merge(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    return this.userRepository.softDelete(id);
  }
}
