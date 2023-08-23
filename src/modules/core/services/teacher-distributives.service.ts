import * as XLSX from 'xlsx';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  CreateTeacherDistributiveDto,
  FilterTeacherDistributiveDto,
  PaginationDto,
  UpdateTeacherDistributiveDto,
} from '@core/dto';
import { TeacherDistributiveEntity } from '@core/entities';
import { CoreRepositoryEnum, MessageEnum } from '@shared/enums';
import { ServiceResponseHttpModel } from '@shared/models';

@Injectable()
export class TeacherDistributivesService {
  constructor(
    @Inject(CoreRepositoryEnum.TEACHER_DISTRIBUTIVE_REPOSITORY)
    private repository: Repository<TeacherDistributiveEntity>,
  ) {}

  async catalogue(): Promise<ServiceResponseHttpModel> {
    const response = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday', 'career'],
      take: 1000,
    });

    return {
      pagination: {
        totalItems: response[1],
        limit: 1000,
      },
      data: response[0],
    };
  }

  async create(payload: CreateTeacherDistributiveDto): Promise<TeacherDistributiveEntity> {
    const newEntity:TeacherDistributiveEntity = this.repository.create(payload);
    return await this.repository.save(newEntity);
  }

  async findAll(params?: FilterTeacherDistributiveDto): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(params);
    }

    //Filter by other field
    //All
    const data = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday', 'career'],
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  async findOne(id: string): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOne({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday', 'career'],
      where: {
        id,
      },
    });

    if (!entity) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontró`);
    }

    return entity;
  }

  async update(id: string, payload: UpdateTeacherDistributiveDto): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(MessageEnum.NOT_FOUND);
    }

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<TeacherDistributiveEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException(`La carrera con id:  ${id} no se encontro`);
    }

    return await this.repository.softRemove(entity);
  }

  async removeAll(payload: TeacherDistributiveEntity[]): Promise<TeacherDistributiveEntity[]> {
    return await this.repository.softRemove(payload);
  }

  private async paginateAndFilter(
    params: FilterTeacherDistributiveDto,
  ): Promise<ServiceResponseHttpModel> {
    let where:
      | FindOptionsWhere<TeacherDistributiveEntity>
      | FindOptionsWhere<TeacherDistributiveEntity>[];
    where = {};
    let { page, search } = params;
    const { limit } = params;

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      //where.push({ acronym: ILike(`%${search}%`) });
    }

    const response = await this.repository.findAndCount({
      relations: ['parallel', 'teacher', 'schoolPeriod', 'subject', 'workday', 'career'],
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      data: response[0],
      pagination: { limit, totalItems: response[1] },
    };
  }


  
  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length > 1) {
      alert('No se permiten varios archivos');
      return;
    }
    else {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        // Print the Excel Data
        console.log(data);
      }
      reader.readAsBinaryString(target.files[0]);
    }
  }
 /*/ 

   generateExcelFile(data: TeacherDistributiveModel[]) {
    const wb = XLSX.utils.book_new();
    const ws_data = [['Paralell', 'Teacher Name', 'School Period', 'Subject', 'Workday', 'Career', 'Hours']];
    
    // Llenar la matriz con los datos de la entidad
    data.forEach(async (item) => {
      const teacher: TeacherModel = await item.teacher;
      const user: UserModel | undefined = await teacher?.user;
  
      ws_data.push([
        item.parallel?.name || '',
        user?.name || '', // Usamos el operador de encadenamiento opcional para manejar 'undefined'
        item.schoolPeriod?.name || '',
        item.subject?.name || '',
        item.workday?.name || '',
        item.career?.name || '',
        item.hours.toString() || '',
      ]);
    });
  
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
  
    XLSX.utils.book_append_sheet(wb, ws, 'TeacherDistributives');
  
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teacher_distributives.xlsx';
    a.click();
  
    URL.revokeObjectURL(url);
  }
/**/ 

}
