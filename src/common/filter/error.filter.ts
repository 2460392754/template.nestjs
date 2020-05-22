import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    private readonly logger: LoggerService;

    constructor() {
        this.logger = new LoggerService();
    }

    async catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        const code = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            code !== HttpStatus.INTERNAL_SERVER_ERROR
                ? exception.message.error || exception.message || null
                : 'Internal server error';
        const errorResponse = {
            status: false,
            message,
            data: {
                code,
            },
        };

        this.logger.error(
            `Catch http exception at [url: ${request.url}] [method: ${request.method}] [status: ${code}]`,
            `\n`,
            exception,
        );
        response.status(code).json(errorResponse);
    }
}
