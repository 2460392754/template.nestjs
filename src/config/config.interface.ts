export interface IConfigService {
    getPort(): number;
    getDB(): IConfigDB;
    getAuth(): IConfigAuth;
}

export interface IEnvConfig {
    PORT: number;

    DATABASE_TYPE: string;
    DATABASE_HOST: string;
    DATABASE_PORT: number;
    DATABASE_USER: string;
    DATABASE_PWD: string;
    DATABASE_DB: string;
    DATABASE_SYNCHRONIZE: boolean;

    AUTH_SECRET: string;
}

export interface IConfigDB {
    type: string;
    host: string;
    port: number;
    user: string;
    pwd: string;
    db: string;
    synchronize: boolean;
}

export interface IConfigAuth {
    secret: string;
}
