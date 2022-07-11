import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere,ILike, Repository } from 'typeorm';
import {
  CreateInformationStudentDto,
  FilterInformationStudentDto,
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

    //Pagination
    if (params.limit && params.offset) {
      return this.pagination(params.limit, params.offset);
    }

    //Filter by search
    if (params.search) {
      return this.filter(params);
    }
    return await this.informationStudentRepository.find({
    relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',

      ],
    });
  }


  async findOne(id: number) {
    const informationStudent = await this.informationStudentRepository.findOne({
      where: {
        id: id,
      },
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
    return await this.informationStudentRepository.delete(id);
  }

  pagination(limit: number, offset: number) {
    return this.informationStudentRepository.find({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
            take: limit,
            skip: offset,
    });
  }

  filter(params: FilterInformationStudentDto) {
    const where: FindOptionsWhere<InformationStudentEntity>[] = [];

    const { search } = params;

    if (search) {
      where.push({ address: ILike(`%${search}%`) });
      where.push({ ancestralLanguage: ILike(`%${search}%`) });
      where.push({ cellPhone: ILike(`%${search}%`) });
      where.push({ companyName: ILike(`%${search}%`) });
      where.push({ contactEmergencyName: ILike(`%${search}%`) });
      where.push({ conadisNumber: ILike(`%${search}%`) });

    }

    return this.informationStudentRepository.find({
      relations: [
        'isAncestralLanguage',
        'isBonusDevelopmentReceive',
        'isDegreeSuperior',
        'isDisability',
        'isSubjectRepeat',
      ],
            where,
    });
  }
}
