import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
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
      payload.bloodType.id,
    );
    const response = await this.userRepository.save(newUser);
    return await this.userRepository.save(response);
  }

  async findAll(params?: FilterUserDto) {
    //Pagination
    if (params.limit > 0 && params.offset >= 0) {
      return this.pagination(params.limit, params.offset);
    }

    //Filter by search
    if (params.search) {
      return this.filter(params);
    }

    //Other filters
    if (params) {
      return this.filterByBirthdate(params.birthdate);
    }

    //All
    return this.userRepository.find({ relations: ['bloodType', 'gender'] });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['bloodType', 'gender'],
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.softDelete(id);
    return true;
  }

  pagination(limit: number, offset: number) {
    return this.userRepository.find({
      relations: ['bloodType', 'gender'],
      order: {
        id: 'ASC',
      },
      take: limit,
      skip: offset,
    });
  }

  filter(params: FilterUserDto) {
    const where: FindOptionsWhere<UserEntity>[] = [];

    const { search } = params;

    if (search) {
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ username: ILike(`%${search}%`) });
    }

    return this.userRepository.find({
      relations: ['bloodType', 'gender'],
      where,
    });
  }

  filterByBirthdate(birthdate: Date) {
    const where: FindOptionsWhere<UserEntity> = {};

    if (birthdate) {
      where.birthdate = LessThan(birthdate);
    }

    return this.userRepository.find({
      relations: ['bloodType', 'gender'],
      where,
    });
  }
}
