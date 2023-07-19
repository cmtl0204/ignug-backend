import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FileEntity } from '@common/entities';
import { CommonRepositoryEnum } from '@shared/enums';
import * as path from 'path';
import { join } from 'path';
import * as fs from 'fs';

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
      type: 'user',
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
        type: 'user',
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
}
