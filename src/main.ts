import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/helpers/winston-logging';
import { AllExceptionsFilter } from './logger/all-exception';

async function startApp() {
  try {
    const PORT = process.env.API_PORT || 4040;

    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');

    app.useGlobalFilters(new AllExceptionsFilter(new Logger()));
    
    const config = new DocumentBuilder()
      .setTitle('Stadium Finder')
      .setDescription('Stadium Finder Project REST API')
      .setVersion('1.0')
      .addTag(
        'NestJs, Validation, swagger, guard, sequalize, pg, miler, bot ,sms, cookie ...',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
