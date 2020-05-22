import { createParamDecorator, Request } from '@nestjs/common';

export const jwtDecorator = createParamDecorator((data, req) => {
    return req.headers.authorization;
});
