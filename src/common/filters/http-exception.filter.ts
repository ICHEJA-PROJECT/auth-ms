import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'An unexpected error occurred.';
    let code = 'INTERNAL_ERROR';
    let details: any;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      code = exception.constructor.name.replace(/Exception$/, '').toUpperCase();

      if (typeof errorResponse === 'object' && errorResponse !== null) {
        if (
          'message' in errorResponse &&
          Array.isArray(errorResponse.message)
        ) {
          message = 'Input data validation failed';
          code = 'VALIDATION_ERROR';
          details = errorResponse.message;
        } else if ('message' in errorResponse) {
          message = errorResponse.message as string;
        }
      } else {
        message = errorResponse.toString();
      }
    }

    this.logger.error(
      `[${request.method} ${request.url}] - Status: ${status} - Error: ${message}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    response.status(status).json({
      statusCode: status,
      message,
      code,
      details,
    });
  }
}
