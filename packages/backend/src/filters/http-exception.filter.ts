import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseVO } from '../common/responseVO';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;
    const responseVO = new ResponseVO();
    responseVO.code = status;
    responseVO.message = exception.message;
    responseVO.data =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof exceptionResponse === 'object'
        ? exceptionResponse.message
        : exceptionResponse;

    response.status(HttpStatus.OK).json(responseVO);
  }
}
