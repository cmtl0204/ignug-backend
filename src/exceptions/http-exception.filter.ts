import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException | Error | QueryFailedError | ExceptionsHandler,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();

    response.status(500).json({
      statusCode: 100,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
