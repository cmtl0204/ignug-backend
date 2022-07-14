import { Injectable, NotFoundException } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, LessThan } from 'typeorm';
import { InformationTeacherEntity } from '@core/entities';
import {
  CreateInformationTeacherDto,
  UpdateInformationTeacherDto,
  FilterInformationTeacherDto,
  PaginationDto,
} from '@core/dto';
import { ServiceResponseHttpModel } from '../../root/models/service-response-http.model';


@Injectable()
export class InformationTeachersService {
  constructor(
    @InjectRepository(InformationTeacherEntity)
    private InformationTeacherRepository: Repository<InformationTeacherEntity>,
    private cataloguesService: CataloguesService,
  ) { }

  async create(payload: CreateInformationTeacherDto) {
    const informationTeacher =
      this.InformationTeacherRepository.create(payload);
    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );

    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );

    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );

    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(payload.countryHigherEducation.id);
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );

    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );

    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );

    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    const response = await this.InformationTeacherRepository.save(
      informationTeacher,
    );
    return this.InformationTeacherRepository.save(response);
  }

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
      take: 1000,
    });

    return {
      pagination: { totalItems: response[1], limit: 10 },
      data: response[0],
    };
  }

  async findAll(params?: FilterInformationTeacherDto) {
    //Pagination
    if (params) {
      return await this.paginateAndFilter(params);
    }

    //Other filters
    if (params.holidays) {
      return this.filterByHolidays(params.holidays);
    }
    const data = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
    });
    return { data: data[0], pagination: { totalItems: data[1], limit: 10 } };
  }

  async findOne(id: number): Promise<ServiceResponseHttpModel> {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ], where: { id },
    });

    if (!informationTeacher) {
      throw new NotFoundException('InformationTeacher not found');
    }

    return { data: informationTeacher };
  }

  async update(id: number, payload: UpdateInformationTeacherDto) {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      where: {
        id
      },
    });

    if (informationTeacher === null) {
      throw new NotFoundException('El docente no se encontro');
    }
    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );

    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );

    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );

    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(payload.countryHigherEducation.id);
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );

    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );

    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );

    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadder.id,
    );
    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTime.id,
    );
    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducation.id,
    );
    informationTeacher.countryHigherEducation =
      await this.cataloguesService.findOne(payload.countryHigherEducation.id);
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarship.id,
    );
    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipType.id,
    );
    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingType.id,
    );
    informationTeacher.username = await this.cataloguesService.findOne(
      payload.username.id,
    );

    await this.InformationTeacherRepository.merge(informationTeacher, payload);
    return this.InformationTeacherRepository.save(informationTeacher);
  }

  async remove(id: number): Promise<ServiceResponseHttpModel> {
    const informationTeacher = await this.InformationTeacherRepository.findOneBy({ id });

    if (!informationTeacher) {
      throw new NotFoundException('InformationTeacher not found');
    }

    return { data: await this.InformationTeacherRepository.softRemove(informationTeacher) };
  }

  async removeAll(payload: InformationTeacherEntity[]): Promise<ServiceResponseHttpModel> {
    return { data: await this.InformationTeacherRepository.softRemove(payload) };
  }

  private async paginateAndFilter(
    params: FilterInformationTeacherDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<InformationTeacherEntity> | FindOptionsWhere<InformationTeacherEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({ academicUnit: ILike(`%${search}%`) });
      where.push({ degreeHigherEducation: ILike(`%${search}%`) });
      where.push({ institutionHigherEducation: ILike(`%${search}%`) });
      where.push({ otherHours: ILike(`%${search}%`) });
      where.push({ technical: ILike(`%${search}%`) });
      where.push({ technology: ILike(`%${search}%`) });
    }

    const response = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
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

  private async filterByHolidays(
    holidays: Date,
  ): Promise<ServiceResponseHttpModel> {
    const where: FindOptionsWhere<InformationTeacherEntity> = {};

    if (holidays) {
      where.holidays = LessThan(holidays);
    }

    const response = await this.InformationTeacherRepository.findAndCount({
      relations: [
        'countryHigherEducation',
        'dedicationTime',
        'financingType',
        'higherEducation',
        'scholarship',
        'scholarshipType',
        'teachingLadder',
        'username',
      ],
      where,
    });

    return {
      data: response[0],
      pagination: { limit: 10, totalItems: response[1] },
    };
  }
}

