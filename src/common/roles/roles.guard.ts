import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
// import { E_CLIENT_ENV } from '../../db';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        console.log(roles);

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        const { env } = this.authService.decode(token);
        // const envName = E_CLIENT_ENV[env];

        // return roles.includes(envName);
    }
}
