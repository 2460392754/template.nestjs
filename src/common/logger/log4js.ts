import * as Log4js from 'log4js';
import * as Dayjs from 'dayjs';
import { inspect } from 'util';
import Chalk from 'chalk';
import { LoggerLevel } from './logger.interface';

const isProduction = process.env.NODE_ENV === 'production';

class ContextTrace {
    constructor(
        public readonly context: string,
        public readonly path?: string,
        public readonly lineNumber?: number,
        public readonly columnNumber?: number,
    ) {}
}

Log4js.addLayout('pocky-nest', (logConfig) => {
    return (logEvent: Log4js.LoggingEvent) => {
        // console.log(logEvent);
        // console.log(logConfig);
        // console.log('===========');

        // logEvent
        const date = Dayjs(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss');
        const level = logEvent.level.levelStr;
        const type = logConfig.type;
        const context = logEvent.context;
        let msg = '';
        // const msg = logEvent.data.join(', ');
        // const msg = logEvent.data.toString();

        logEvent.data.forEach((value: any) => {
            if (value instanceof ContextTrace) {
                msg += `[lineNumber: ${value.lineNumber}] [path: ${value.path}]`;

                return;
            }

            if (typeof value !== 'string') {
                msg += `[${inspect(value, false, 3, true)}] `;
            } else {
                msg += `[${value}]`;
            }
        });

        let dataOutput = `[${level}] ${msg}`;

        if (isProduction) {
            return `${type} ${date} ${dataOutput}`;
        }

        switch (level) {
            case LoggerLevel.DEBUG:
                dataOutput = Chalk.green(dataOutput);
                break;
            case LoggerLevel.INFO:
            case LoggerLevel.LOG:
                dataOutput = Chalk.cyan(dataOutput);
                break;
            case LoggerLevel.WARN:
            case LoggerLevel.WARNING:
                dataOutput = Chalk.yellow(dataOutput);
                break;
            case LoggerLevel.ERROR:
                dataOutput = Chalk.red(dataOutput);
                break;
            case LoggerLevel.FATAL:
                dataOutput = Chalk.hex('#DD4C35')(dataOutput);
                break;
            default:
                dataOutput = Chalk.grey(dataOutput);
                break;
        }

        return `${Chalk.green(type)} ${date} ${dataOutput}`;
    };
});

Log4js.configure({
    appenders: {
        MyLog: {
            type: isProduction ? 'dateFile' : 'console',
            layout: { type: 'pocky-nest' },
            filename: './logs/prod',
            pattern: 'yyyy-MM-dd.log',
            daysToKeep: 30,
            alwaysIncludePattern: true,
        },
    },
    categories: {
        default: {
            appenders: ['MyLog'],
            level: 'debug',
        },
    },
});

export const logger = Log4js.getLogger();
