import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log(`Handling ${context.switchToHttp().getRequest().url}...`);

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Handled ${context.switchToHttp().getRequest().url} in ${Date.now() - now}ms`)),
      );
  }
}