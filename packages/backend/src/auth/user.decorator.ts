import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserVO } from '../user/entities/user.vo.entity';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserVO }>();
    return request.user;
  },
);
