import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ViewUserDto } from '../user/dto/view-user.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: ViewUserDto }>();
    return request.user;
  },
);
