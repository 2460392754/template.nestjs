import { Injectable } from '@nestjs/common';
import { logger } from './log4js';

@Injectable()
export class LoggerService {
    trace(message, ...args) {
        logger.trace(message, ...args);
    }

    debug(message, ...args) {
        logger.debug(message, ...args);
    }

    log(message, ...args) {
        logger.info(message, ...args);
    }

    info(message, ...args) {
        logger.info(message, ...args);
    }

    warn(message, ...args) {
        logger.warn(message, ...args);
    }

    warning(message, ...args) {
        logger.warn(message, ...args);
    }

    error(message, ...args) {
        logger.error(message, ...args);
    }

    fatal(message, ...args) {
        logger.fatal(message, ...args);
    }
}
