import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ResponseHttpModel } from './response-http.model';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const responseHttpModel: ResponseHttpModel = {
      statusCode: 500,
      message: 'Server Error',
      error: 'Server Error',
    };

    console.log(exception);

    if (exception instanceof HttpException) {
      const { message } = exception.getResponse() as ResponseHttpModel;
      if (exception instanceof BadRequestException) {
        responseHttpModel.error = 'Bad Request';
        responseHttpModel.message = message;
      }

      if (exception instanceof UnauthorizedException) {
        responseHttpModel.error = 'Unauthorized';
        responseHttpModel.message = 'You do not have authorization.';
      }

      if (exception instanceof NotFoundException) {
        responseHttpModel.error = 'Route/Model not found';
        responseHttpModel.message = message;
      }

      if (exception instanceof ForbiddenException) {
        responseHttpModel.error = 'Forbidden';
        responseHttpModel.message = message;
      }

      responseHttpModel.statusCode = exception.getStatus();
    }

    if (exception instanceof QueryFailedError) {
      console.log(exception);
      responseHttpModel.statusCode = 400;
      responseHttpModel.error = '';
      responseHttpModel.message = '';
    }

    response.status(responseHttpModel.statusCode).json(responseHttpModel);
  }
}
