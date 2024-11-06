import {
  Logger,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

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

    const errorMessage =
      exception instanceof HttpException ? exception.getResponse() : exception;

    const stackTrace = exception instanceof Error ? exception.stack : null;

    this.logger.error(
      `Status: ${status} - Error: ${JSON.stringify(errorMessage)} - Path: ${
        request.url
      }`,
      stackTrace,
    );

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof HttpException
          ? (exception.getResponse() as string | object)
          : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
