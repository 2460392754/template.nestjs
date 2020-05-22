import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService, jwtDecorator } from '../';
import { AuthService } from './auth.service';
import { jwtDecorator } from '../decorator/jwt.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/check')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: '验证 token状态' })
    check(@jwtDecorator() jwt) {
        return this.authService.check(jwt);
    }
}
