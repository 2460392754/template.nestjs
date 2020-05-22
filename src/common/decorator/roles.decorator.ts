import { SetMetadata } from '@nestjs/common';

// 角色权限装饰器
export const RolesDecorator = (...roles: string[]) => SetMetadata('roles', roles);
