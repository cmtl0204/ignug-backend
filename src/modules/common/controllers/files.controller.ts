import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseUUIDPipe,
  Get,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from '@common/services';
import { getFileName, fileFilter } from '@shared/helpers';
import { ResponseHttpModel, ServiceResponseHttpModel } from '@shared/models';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `${join(
          process.cwd(),
        )}/src/resources/uploads/${new Date().getFullYear()}/${new Date().getMonth()}`,
        filename: getFileName,
      }),
      fileFilter: fileFilter,
      limits: { fieldSize: 10 },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    const response = await this.filesService.uploadFile(file, id);
    return { data: response, message: 'Upload File', title: 'Upload' };
  }

  @Post('uploads/:id')
  @UseInterceptors(
    FilesInterceptor('files[]', 10, {
      storage: diskStorage({
        destination: `${join(
          process.cwd(),
        )}/src/resources/uploads/${new Date().getFullYear()}/${new Date().getMonth()}`,
        filename: getFileName,
      }),
      fileFilter: fileFilter,
      limits: { fieldSize: 1 },
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseHttpModel> {
    await this.filesService.uploadFiles(files, id);

    return { data: null, message: 'Upload Files', title: 'Upload' };
  }

  @Get('download/:id')
  async download(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res,
  ): Promise<ResponseHttpModel> {
    const path = await this.filesService.getPath(id);

    return {
      data: res.sendFile(path),
      message: 'Download File',
      title: 'Download',
    };
  }
}
