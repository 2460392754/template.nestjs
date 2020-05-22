import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { UserRepository } from '../../db';
import { ConfigService } from '../../config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

const { secret } = new ConfigService().getAuth();

@Global()
@Module({
    imports: [
        PassportModule,
        // TypeOrmModule.forFeature([UserRepository]),
        JwtModule.register({
            secret,
            signOptions: { expiresIn: '7d' }, // 7天有效期
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
