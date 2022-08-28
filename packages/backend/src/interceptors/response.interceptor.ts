import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseVO } from '../common/responseVO';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseVO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseVO<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    return next.handle().pipe(
      map((data) => {
        if (req.method === 'POST') {
          if (res.statusCode === HttpStatus.CREATED) {
            res.status(HttpStatus.OK);
          }
        }

        const responseVO = new ResponseVO<T>();
        responseVO.code = 200;
        responseVO.data = data;
        responseVO.message = '';
        return responseVO;
      }),
    );
  }
}
