import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config';
import * as commonModule from '../common/index.module';
import AddIterator from '../utils/add-iterator';

AddIterator(commonModule);

@Module({
    imports: [ConfigModule, ...(commonModule as any)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
