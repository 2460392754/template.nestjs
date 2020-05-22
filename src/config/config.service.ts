import { Injectable } from '@nestjs/common';
import * as I from './config.interface';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService implements I.IConfigService {
    private readonly envConfig: I.IEnvConfig;

    constructor() {
        const env = process.env.NODE_ENV;
        const filePath = `env/${env}.env`;
        const envConfig = dotenv.parse(fs.readFileSync(filePath));

        this.envConfig = envConfig as any;
    }

    // 运行端口
    getPort() {
        return this.envConfig.PORT;
    }

    // 数据库配置
    getDB() {
        const {
            DATABASE_TYPE: type,
            DATABASE_HOST: host,
            DATABASE_PORT: port,
            DATABASE_USER: user,
            DATABASE_PWD: pwd,
            DATABASE_DB: db,
            DATABASE_SYNCHRONIZE: synchronize,
        } = this.envConfig;

        return { type, host, port, user, pwd, db, synchronize };
    }

    // 认证
    getAuth() {
        const { AUTH_SECRET: secret } = this.envConfig;

        return { secret };
    }
}
