import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FileEntity } from '@common/entities';
import { CommonRepositoryEnum } from '@shared/enums';
import * as path from 'path';
import { join } from 'path';
import * as fs from 'fs';
import { FilterCareerDto, PaginationDto } from '@core/dto';
import { ServiceResponseHttpModel } from '@shared/models';
import { CareerEntity } from '@core/entities';
import { FilterFileDto } from '@common/dto';

@Injectable()
export class FilesService {
  constructor(
    @Inject(CommonRepositoryEnum.FILE_REPOSITORY)
    private repository: Repository<FileEntity>,
  ) {}

  async uploadFile(file: Express.Multer.File, modelId: string) {
    const filePath = `uploads/${new Date().getFullYear()}/${new Date().getMonth()}/${
      file.filename
    }`;
    const payload = {
      modelId,
      fileName: file.filename,
      extension: path.extname(file.originalname),
      originalName: file.originalname,
      path: filePath,
      size: file.size,
      // type: 'user',
    };

    const newFile = this.repository.create(payload);

    return await this.repository.save(newFile);
  }

  async uploadFiles(files: Array<Express.Multer.File>, modelId: string) {
    files.forEach((file) => {
      const filePath = `uploads/${new Date().getFullYear()}/${new Date().getMonth()}/${
        file.filename
      }`;
      const payload = {
        modelId,
        fileName: file.filename,
        extension: path.extname(file.originalname),
        originalName: file.originalname,
        path: filePath,
        size: file.size,
        // type: 'user',
      };

      const newFile = this.repository.create(payload);

      this.repository.save(newFile);
    });
  }

  async findOne(id: string): Promise<FileEntity> {
    return await this.repository.findOneBy({ id });
  }

  async getPath(id: string): Promise<string> {
    const file = await this.findOne(id);

    const path = `${join(process.cwd())}/src/resources/${file?.path}`;

    if (!fs.existsSync(path)) {
      throw new NotFoundException('File not found');
    }

    return path;
  }

  async findByModel(
    modelId: string,
    params?: FilterFileDto,
  ): Promise<ServiceResponseHttpModel> {
    //Pagination & Filter by search
    if (params?.limit > 0 && params?.page >= 0) {
      return await this.paginateAndFilter(modelId, params);
    }

    //All
    const data = await this.repository.findAndCount({
      where: { modelId: params.modelId },
    });

    return { pagination: { totalItems: data[1], limit: 10 }, data: data[0] };
  }

  private async paginateAndFilter(
    modelId: string,
    params: FilterFileDto,
  ): Promise<ServiceResponseHttpModel> {
    let where: FindOptionsWhere<FileEntity> | FindOptionsWhere<FileEntity>[];

    let { page, search } = params;
    const { limit } = params;

    where = [];
    where.push({ modelId: Equal(modelId) });

    if (search) {
      search = search.trim();
      page = 0;
      where = [];
      where.push({
        originalName: ILike(`%${search}%`),
        modelId: Equal(modelId),
      });
    }

    const response = await this.repository.findAndCount({
      where,
      take: limit,
      skip: PaginationDto.getOffset(limit, page),
    });

    return {
      pagination: { limit, totalItems: response[1] },
      data: response[0],
    };
  }
}
