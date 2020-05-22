import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { swagger } from './swagger';
import { ConfigService } from './config';
import { LoggerService, ValidationPipe, ExceptionsFilter } from './common/index.service';

const config = new ConfigService();

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new LoggerService(),
    });

    swagger(app);
    useGlobal(app);
    await app.listen(config.getPort());
})();

// 注册全局配置
function useGlobal(app) {
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ExceptionsFilter());
    app.useLogger(app.get(LoggerService));
}
