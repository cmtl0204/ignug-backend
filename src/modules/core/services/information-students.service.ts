import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, LessThan, Repository } from 'typeorm';
import { InformationStudentEntity } from '@core/entities';
import {
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  PaginationDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { CataloguesService } from './catalogues.service';
import { ServiceResponseHttpModel } from '@shared/models';
import { CoreRepositoryEnum } from '@shared/enums';

@Injectable()
export class InformationStudentsService {
  constructor(
    @Inject(CoreRepositoryEnum.INFORMATION_STUDENT_REPOSITORY)
    private repository: Repository<InformationStudentEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(
    payload: CreateInformationStudentDto,
  ): Promise<InformationStudentEntity> {
    const newInformationStudent = this.repository.create(payload);

    return await this.repository.save(newInformationStudent);
  }

  async findAll(
    params?: FilterInformationStudentDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.community) {
      return this.filterByCommunity(params.community);
    }

    //All
    const data = await this.repository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
    });

    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: string): Promise<InformationStudentEntity> {
    const informationStudent = await this.repository.findOne({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where: { id },
    });

    if (informationStudent === null) {
      throw new NotFoundException('La informacion no se encontro');
    }

    return informationStudent;
  }

  async update(
    id: string,
    payload: UpdateInformationStudentDto,
  ): Promise<InformationStudentEntity> {
    const informationStudent = await this.repository.findOneBy({ id });

    if (informationStudent === null) {
      throw new NotFoundException(
        'La informacion del estudiante no se encontro',
      );
    }
    informationStudent.isExecutedPractice =
      await this.cataloguesService.findOne(payload.isExecutedPractice.id);

    informationStudent.isExecutedCommunity =
      await this.cataloguesService.findOne(payload.isExecutedCommunity.id);

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isLostGratuity = await this.cataloguesService.findOne(
      payload.isLostGratuity.id,
    );

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isSubjectRepeat = await this.cataloguesService.findOne(
      payload.isSubjectRepeat.id,
    );

    this.repository.merge(informationStudent, payload);

    return await this.repository.save(informationStudent);
  }

  async remove(id: string): Promise<InformationStudentEntity> {
    const informationStudent = await this.repository.findOneBy({ id });

    if (!informationStudent) {
      throw new NotFoundException('Information Student not found');
    }

    return await this.repository.save(informationStudent);
  }

  async removeAll(
    payload: InformationStudentEntity[],
  ): Promise<InformationStudentEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(
    params: FilterInformationStudentDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<InformationStudentEntity>
      | FindOptionsWhere<InformationStudentEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ address: ILike(`%${search}%`) });
      where.push({ contactEmergencyName: ILike(`%${search}%`) });
      where.push({ contactEmergencyKinship: ILike(`%${search}%`) });
      where.push({ contactEmergencyPhone: ILike(`%${search}%`) });
      where.push({ postalCode: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }

  private async filterByCommunity(
    community: number,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<InformationStudentEntity> = {};

    if (community) {
      where.community = LessThan(community);
    }

    const response = await this.repository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}
