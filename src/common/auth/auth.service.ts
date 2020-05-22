import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as I from './auth.interface';
// import { UserRepository } from '../../db';
// import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) // private readonly userRepository: UserRepository,
    {}

    // 验证token解密后的字段
    async validate(data: I.IEncodeResult): Promise<boolean> {
        // const { userId, env } = data;
        // const result = await this.userRepository.$has({ id: userId, env });

        // return result !== false;

        return true;
    }

    // 自动判断裁剪字符
    private _autoSubToken(token: string) {
        return token.indexOf('Bearer ') !== -1 ? token.substr(7) : token;
    }

    // 加密
    async encode(data: I.IEncodeResult): Promise<string> {
        const token = this.jwtService.sign(data);

        return token;
    }

    // 解密
    decode(token: string): I.IEncodeResult {
        const completeToken = this._autoSubToken(token);

        return this.jwtService.decode(completeToken) as I.IEncodeResult;
    }

    // 验证token
    check(token: string) {
        const completeToken = this._autoSubToken(token);

        return this.jwtService.verify(completeToken);
    }
}
