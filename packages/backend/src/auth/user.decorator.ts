import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../user/entities/user.entity';

export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserEntity }>();
    return request.user;
  },
);
