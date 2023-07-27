import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';
import { FilterStudentDto, PaginationDto, UpdateStudentDto } from '@core/dto';
import { StudentEntity, TeacherEntity } from '@core/entities';
import { CoreRepositoryEnum } from '@shared/enums';
import { UsersService } from '@auth/services';
import { CreateTeacherDto } from '../dto/teachers/create-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(CoreRepositoryEnum.TEACHER_REPOSITORY)
    private repository: Repository<TeacherEntity>,
    private usersService: UsersService,
  ) {}

  async create(payload: any): Promise<any> {
    const newEntity = this.repository.create(payload);
    return await this.repository.save(newEntity);
  }

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: FilterStudentDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.repository.findAndCount();

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<TeacherEntity> {
    const teacher = await this.repository.findOne({
      where: { id },
    });

    if (!teacher) {
      throw new NotFoundException('Student not found');
    }

    return teacher;
  }

  async update(id: string, payload: UpdateStudentDto): Promise<TeacherEntity> {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    this.repository.merge(student, payload);

    return this.repository.save(student);
  }

  async remove(id: string): Promise<TeacherEntity> {
    const student = await this.repository.findOneBy({ id });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return await this.repository.softRemove(student);
  }

  async removeAll(payload: StudentEntity[]): Promise<TeacherEntity[]> {
    return this.repository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterStudentDto) {
    let where:
      | FindOptionsWhere<StudentEntity>
      | FindOptionsWhere<StudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      // where.push({ name: ILike(`%${search}%`) });
    }

    const data = await this.repository.findAndCount({
      relations: { user: true },
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
