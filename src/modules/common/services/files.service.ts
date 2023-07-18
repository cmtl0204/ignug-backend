import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FileEntity } from '@common/entities';
import { RepositoryEnum } from '@shared/enums';
import * as path from 'path';
import { join } from 'path';

@Injectable()
export class FilesService {
  constructor(
    @Inject(RepositoryEnum.FILE_REPOSITORY)
    private repository: Repository<FileEntity>,
  ) {}

  async upload(file: Express.Multer.File, id: string) {
    const filePath = `uploads/${new Date().getFullYear()}-${new Date().getMonth()}/${
      file.filename
    }`;
    const payload = {
      fileableId: id,
      fileName: file.filename,
      extension: path.extname(file.originalname),
      originalName: file.originalname,
      path: filePath,
      size: file.size,
    };

    const newFile = this.repository.create(payload);

    return await this.repository.save(newFile);
  }

  async download(id: string) {
    return await this.repository.findOneBy({ id });
  }
}
