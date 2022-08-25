import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserVo } from '../user/vo/user.vo';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserVo }>();
    return request.user;
  },
);
