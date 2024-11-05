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

    // Status kodini aniqlash: HttpException bo‘lsa statusni olamiz, aks holda 500
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Xatolik haqida batafsil loglash
    const errorMessage =
      exception instanceof HttpException ? exception.getResponse() : exception;

    // Stack izlarini olish
    const stackTrace = exception instanceof Error ? exception.stack : null;

    // Loggerga to'liq xatolikni yozish
    this.logger.error(
      `Status: ${status} - Error: ${JSON.stringify(errorMessage)} - Path: ${
        request.url
      }`,
      stackTrace,
    );

    // Foydalanuvchiga javob qaytarish
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
