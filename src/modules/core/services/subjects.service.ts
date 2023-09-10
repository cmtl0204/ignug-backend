import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { CreateSubjectDto, FilterSubjectDto, SeedSubjectDto, UpdateSubjectDto } from '@core/dto';
import { SubjectEntity } from '@core/entities';
import { PaginationDto } from '@core/dto';
import { CataloguesService, CurriculumsService, SubjectRequirementsService } from '@core/services';
import { ServiceResponseHttpModel } from '@shared/models';
import { CatalogueStateEnum, CoreRepositoryEnum, MessageEnum } from '@shared/enums';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(CoreRepositoryEnum.SUBJECT_REPOSITORY)
    private repository: Repository<SubjectEntity>,
    private subjectRequirementsService: SubjectRequirementsService,
    private curriculumService: CurriculumsService,
  ) {}

  async create(payload: CreateSubjectDto | SeedSubjectDto): Promise<SubjectEntity> {
    const newSubject = this.repository.create(payload);

    return await this.repository.save(newSubject);
  }

  async findAll(params?: FilterSubjectDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params?.autonomousHour) {
      return this.filterByAutonomousHour(params.autonomousHour);
    }

    //All
    const data = await this.repository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<SubjectEntity> {
    const subject = await this.repository.findOne({
      relations: {
        academicPeriod: true,
        state: true,
        type: true,
        subjectRequirements: { requirement: true },
      },
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException('Asignatura no encontrada');
    }

    return subject;
  }

  async findByCode(code: string): Promise<SubjectEntity> {
    return await this.repository.findOne({ where: { code } });
  }

  async update(id: string, payload: UpdateSubjectDto): Promise<SubjectEntity> {
    const subject = await this.repository.findOneBy({ id });

    const subjectRequirements = payload.subjectRequirements;

    await this.subjectRequirementsService.removeBySubject(id);
    for (let i = 0; i < subjectRequirements.length; i++) {
      this.subjectRequirementsService.create(subjectRequirements[i]);
    }

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    this.repository.merge(subject, payload);

    return await this.repository.save(subject);
  }

  async remove(id: string): Promise<SubjectEntity> {
    const subject = await this.repository.findOneBy({ id });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return await this.repository.save(subject);
  }

  async removeAll(payload: SubjectEntity[]): Promise<SubjectEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterSubjectDto): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<SubjectEntity> | FindOptionsWhere<SubjectEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ code: ILike(`%${search}%`) });
      where.push({ name: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByAutonomousHour(autonomousHour: number): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<SubjectEntity> = {};

    if (autonomousHour) {
      where.autonomousHour = LessThan(autonomousHour);
    }

    const response = await this.repository.findAndCount({
      relations: ['academicPeriod', 'curriculum', 'state', 'type'],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }

  async hide(id: string): Promise<SubjectEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }
    entity.isVisible = false;
    return await this.repository.save(entity);
  }

  async reactivate(id: string): Promise<SubjectEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }
    entity.isVisible = true;
    return await this.repository.save(entity);
  }
}
