import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig = {
  transports: [
    // Umumiy 'info' darajasidagi loglar uchun Console transport
    new winston.transports.Console({
      level: 'info', // Faqat 'info' darajasidagi loglar uchun
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),

    // Umumiy 'info' darajasidagi loglar uchun File transport
    new winston.transports.File({
      filename: 'application.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),

    // Faqat 'error' darajasidagi loglar uchun File transport
    new winston.transports.File({
      filename: 'error.log',
      level: 'error', // Faqat 'error' loglarini yozadi
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
