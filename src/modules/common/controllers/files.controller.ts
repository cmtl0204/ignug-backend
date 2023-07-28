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
  Query,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from '@common/services';
import { getFileName, fileFilter } from '@shared/helpers';
import { ResponseHttpModel } from '@shared/models';
import { join } from 'path';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilterFileDto } from '@common/dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @ApiOperation({ summary: 'Upload File' })
  @Post('upload/:modelId')
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
    @Param('modelId', ParseUUIDPipe) modelId: string,
  ): Promise<ResponseHttpModel> {
    const response = await this.filesService.uploadFile(file, modelId);
    return { data: response, message: 'Upload File', title: 'Upload' };
  }

  @ApiOperation({ summary: 'Upload Files' })
  @Post('uploads/:modelId')
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
    @Param('modelId', ParseUUIDPipe) modelId: string,
  ): Promise<ResponseHttpModel> {
    await this.filesService.uploadFiles(files, modelId);

    return { data: null, message: 'Upload Files', title: 'Upload' };
  }

  @ApiOperation({ summary: 'Download File' })
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

  @ApiOperation({ summary: 'Find By Model' })
  @Get('models/:id')
  async findByModel(
    @Param('modelId', ParseUUIDPipe) modelId: string,
    @Query() params: FilterFileDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.filesService.findByModel(
      modelId,
      params,
    );

    return {
      data: serviceResponse,
      message: 'Find Files',
      title: 'Find',
    };
  }
}
