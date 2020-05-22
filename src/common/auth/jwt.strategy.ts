import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../../config';
import { AuthService } from './auth.service';
import { IEncodeResult } from './auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getAuth().secret,
        });
    }

    async validate(data: IEncodeResult) {
        const flag = await this.authService.validate(data);

        if (!flag) {
            throw new UnauthorizedException('jwt解密后字段验证错误');
        }

        return flag;
    }
}
