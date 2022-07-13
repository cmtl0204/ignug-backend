import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateInformationStudentDto,
  FilterInformationStudentDto,
  PaginationDto,
  UpdateInformationStudentDto,
} from '@core/dto';
import { InformationStudentEntity } from '@core/entities';
import { CataloguesService } from './catalogues.service';

@Injectable()
export class InformationStudentsService {
  constructor(
    @InjectRepository(InformationStudentEntity)
    private informationStudentRepository: Repository<InformationStudentEntity>,
    private cataloguesService: CataloguesService,
  ) {}

  async create(payload: CreateInformationStudentDto) {
    const newInformationStudent =
      this.informationStudentRepository.create(payload);

    this.informationStudentRepository.create(payload);

    newInformationStudent.isBonusDevelopmentReceive =
      await this.cataloguesService.findOne(
        payload.isBonusDevelopmentReceive.id,
      );

    newInformationStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguage.id);

    newInformationStudent.isDegreeSuperior =
      await this.cataloguesService.findOne(payload.isDegreeSuperior.id);

    newInformationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    newInformationStudent.isSubjectRepeat =
      await this.cataloguesService.findOne(payload.isSubjectRepeat.id);

    return await this.informationStudentRepository.save(newInformationStudent);
  }

  async findAll(params?: FilterInformationStudentDto) {
    //Pagination & Filter by search
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //All
    const data = await this.informationStudentRepository.findAndCount({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: number) {
    const informationStudent = await this.informationStudentRepository.findOne({
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

  async update(id: number, payload: UpdateInformationStudentDto) {
    const informationStudent = await this.informationStudentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (informationStudent === null) {
      throw new NotFoundException(
        'La informacion del estudiante no se encontro',
      );
    }
    informationStudent.isBonusDevelopmentReceive =
      await this.cataloguesService.findOne(
        payload.isBonusDevelopmentReceive.id,
      );

    informationStudent.isAncestralLanguage =
      await this.cataloguesService.findOne(payload.isAncestralLanguage.id);

    informationStudent.isDegreeSuperior = await this.cataloguesService.findOne(
      payload.isDegreeSuperior.id,
    );

    informationStudent.isDisability = await this.cataloguesService.findOne(
      payload.isDisability.id,
    );

    informationStudent.isSubjectRepeat = await this.cataloguesService.findOne(
      payload.isSubjectRepeat.id,
    );

    this.informationStudentRepository.merge(informationStudent, payload);
    return await this.informationStudentRepository.save(informationStudent);
  }

  async remove(id: number) {
    return await this.informationStudentRepository.softDelete(id);
  }

  async removeAll(payload: InformationStudentEntity[]) {
    return await this.informationStudentRepository.softRemove(payload);
  }

  private async paginateAndFilter(params: FilterInformationStudentDto) {
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
      where.push({ ancestralLanguage: ILike(`%${search}%`) });
      where.push({ cellPhone: ILike(`%${search}%`) });
      where.push({ companyName: ILike(`%${search}%`) });
      where.push({ contactEmergencyName: ILike(`%${search}%`) });
      where.push({ conadisNumber: ILike(`%${search}%`) });
    }

    const data = await this.informationStudentRepository.findAndCount({
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

    return { pagination: { limit, totalItems: data[1] }, data: data[0] };
  }
}
