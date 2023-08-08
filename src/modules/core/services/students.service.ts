import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilterStudentDto, PaginationDto, UpdateStudentDto } from '@core/dto';
import { StudentEntity } from '@core/entities';
import { CoreRepositoryEnum } from '@shared/enums';
import { UsersService } from '@auth/services';
import { InformationStudentsService } from './information-students.service';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class StudentsService {
  constructor(
    @Inject(CoreRepositoryEnum.STUDENT_REPOSITORY)
    private repository: Repository<StudentEntity>,
    private usersService: UsersService,
    private informationStudentsService: InformationStudentsService,
  ) {}

  async catalogue() {
    const data = await this.repository.findAndCount({
      take: 1000,
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findAll(params?: FilterStudentDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field

    //All
    const data = await this.repository.findAndCount({
      relations: { user: true, informationStudent: true },
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({
      relations: { user: true, informationStudent: true },
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    return entity;
  }

  async update(id: string, payload: UpdateStudentDto): Promise<StudentEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Estudiante no encontrado');
    }

    this.repository.merge(entity, payload);

    await this.repository.save(entity);

    await this.usersService.update(payload.user.id, payload.user);

    payload.informationStudent.student = await this.repository.save(entity);

    if (payload.informationStudent?.id) {
      await this.informationStudentsService.update(
        payload.informationStudent.id,
        payload.informationStudent,
      );
    } else {
      const { id, ...informationStudentRest } = payload.informationStudent;
      await this.informationStudentsService.create(informationStudentRest);
    }

    return entity;
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Student not found');
    }

    return await this.repository.softRemove(entity);
  }

  async removeAll(payload: StudentEntity[]) {
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
      relations: { user: true, informationStudent: true },
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }

  async create(payload: any): Promise<any> {
    const newEntity = this.repository.create(payload);
    return await this.repository.save(newEntity);
  }
}
