import { Injectable, NotFoundException } from '@nestjs/common';
import { CataloguesService } from '@core/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { InformationTeacherEntity } from '@core/entities';
import { CreateInformationTeacherDto, UpdateInformationTeacherDto } from '@core/dto';

@Injectable()
export class InformationTeachersService {

  constructor(
    @InjectRepository(InformationTeacherEntity)
    private InformationTeacherRepository: Repository<InformationTeacherEntity>,
    private cataloguesService: CataloguesService

  ) { }


  async create(payload: CreateInformationTeacherDto) {
    const informationTeacher = this.InformationTeacherRepository.create(payload);
    informationTeacher.teachingLadder = await this.cataloguesService.findOne(
      payload.teachingLadderId,
    );

    informationTeacher.dedicationTime = await this.cataloguesService.findOne(
      payload.dedicationTimeId,
    );

    informationTeacher.higherEducation = await this.cataloguesService.findOne(
      payload.higherEducationId,
    );

    informationTeacher.countryHigherEducation = await this.cataloguesService.findOne(
      payload.countryHigherEducationId,
    );
    informationTeacher.scholarship = await this.cataloguesService.findOne(
      payload.scholarshipId,
    );

    informationTeacher.scholarshipType = await this.cataloguesService.findOne(
      payload.scholarshipTypeId,
    );

    informationTeacher.financingType = await this.cataloguesService.findOne(
      payload.financingTypeId,
    );

    informationTeacher.username = await this.cataloguesService.findOne(
      payload.usernameId,
    );

    const response = await this.InformationTeacherRepository.save(informationTeacher);
    return this.InformationTeacherRepository.save(response);
  }

  async findAll() {
    return await this.InformationTeacherRepository.find();
  }

  async findOne(id: number) {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      
      where: {
        id: id,
      },
      
    });

    if (informationTeacher === null) {
      throw new NotFoundException('El teacher no se encontro');
    }

    return informationTeacher;
  }

  async remove(id: number) {
    return this.InformationTeacherRepository.softDelete(id);
  }

  async update(id: number, payload: UpdateInformationTeacherDto) {
    const informationTeacher = await this.InformationTeacherRepository.findOne({
      
      where: {
        id: id,
      },
      
    });

    if (informationTeacher === null) {
      throw new NotFoundException('El docente no se encontro');
    }
  

    await this.InformationTeacherRepository.merge(informationTeacher, payload);

    return await this.InformationTeacherRepository.save(informationTeacher);
  }

}