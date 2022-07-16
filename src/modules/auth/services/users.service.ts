import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateUserDto, FilterUserDto, UpdateUserDto } from '@auth/dto';
import { UserEntity } from '@auth/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { RepositoryEnum } from '@shared/enums';

@Injectable()
export class UsersService {
  constructor(
    @Inject(RepositoryEnum.USER_REPOSITORY)
    private userRepository: Repository<UserEntity>,
    private catalogueService: CataloguesService,
  ) {}

  async create(payload: CreateUserDto): Promise<ServiceResponseHttpModel> {
    const newUser = this.userRepository.create(payload);

    newUser.bloodType = await this.catalogueService.findOne(
      payload.bloodType.id,
    );

    const userCreated = await this.userRepository.save(newUser);

    return { data: userCreated };
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      take: 1000,
    });

    return {
      pagination: { totalItems: response[1], limit: 10 },
      data: response[0],
    };
  }

  async findAll(params?: FilterUserDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by Search
    if (params.limit > 0 && params.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.birthdate) {
      return this.filterByBirthdate(params.birthdate);
    }

    //All
    const data = await this.userRepository.findAndCount({
      relations: ['bloodType'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOne({
      relations: ['bloodType', 'gender'],
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { data: user };
  }

  async update(
    id: number,
    payload: UpdateUserDto,
  ): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.userRepository.merge(user, payload);
    const userUpdated = await this.userRepository.save(user);

    return { data: userUpdated };
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userDeleted = await this.userRepository.save(user);

    return { data: userDeleted };
  }

  async removeAll(payload: UserEntity[]): Promise<ServiceResponseHttpModel> {
    const usersDeleted = await this.userRepository.softRemove(payload);

    return { data: usersDeleted };
  }

  private async paginateAndFilter(
    params: FilterUserDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ lastname: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
      where.push({ username: ILike(`%${search}%`) });
    }

    const response = await this.userRepository.findAndCount({
      relations: ['bloodType'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByBirthdate(
    birthdate: Date,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<UserEntity> = {};

    if (birthdate) {
      where.birthdate = LessThan(birthdate);
    }

    const response = await this.userRepository.findAndCount({
      relations: ['bloodType', 'gender'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
