import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  ParseUUIDPipe,
  Get,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from '@common/services';
import { getFileName, fileFilter } from '@shared/helpers';
import { ServiceResponseHttpModel } from '@shared/models';
import * as fs from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${join(
          process.cwd(),
        )}/src/uploads/${new Date().getFullYear()}-${new Date().getMonth()}`,
        filename: getFileName,
      }),
      fileFilter: fileFilter,
      limits: { fieldSize: 100 },
    }),
  )
  async uploadWithId(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceResponseHttpModel> {
    const response = await this.filesService.upload(file, id);
    return { data: response };
  }

  @Get(':id')
  async download(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    const file = await this.filesService.download(id);

    const path = `${join(process.cwd())}/src/${file?.path}`;

    if (!fs.existsSync(path)) {
      throw new NotFoundException('File not found');
    }

    const fileStream = fs.createReadStream(path);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Download finished');
    });

    return fileStream.pipe(res);
  }
}
