import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, LessThan, In } from 'typeorm';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { CataloguesService } from '@core/services';
import { PaginationDto } from '@core/dto';

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

    const userCreated = await this.userRepository.save(newUser);

    return await this.userRepository.save(userCreated);
  }

  async catalogue() {
    const data = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: FilterUserDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params) {
      return this.filterByBirthdate(params.birthdate);
    }

    //All
    const data = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['bloodType', 'gender'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, payload);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.softRemove(user);
  }

  async removeAll(payload: UserEntity[]) {
    return await this.userRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterUserDto) {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 1;
      where = [];
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ username: ILike(`%${search}%`) });
    }

    const data = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }

  private async filterByBirthdate(birthdate: Date) {
    const where: FindOptionsWhere<UserEntity> = {};

    if (birthdate) {
      where.birthdate = LessThan(birthdate);
    }

    const data = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
    });

    return { pagination: { limit: 10, totalItems: data[1] }, data: data[0] };
  }
}
