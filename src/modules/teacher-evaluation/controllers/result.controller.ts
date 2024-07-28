import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { ResponseHttpModel } from '@shared/models';
import { Auth, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';

@Auth()
@Controller('teacher-evaluations/results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {
  }

  @Post('auto-evaluations')
  @HttpCode(HttpStatus.CREATED)
  async create(@User() user: UserEntity, @Body() payload: any): Promise<ResponseHttpModel> {
    const result = await this.resultService.createAutoEvaluation(user.id, payload);
    return {
      data: result,
      message: 'Resultado creado exitosamente',
      title: 'Resultado Creado',
    };
  }
}
