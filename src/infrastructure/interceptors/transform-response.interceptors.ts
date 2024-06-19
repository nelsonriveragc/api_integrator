import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.formatSuccessResponse(data)),
      catchError((error) => this.handleError(error)),
    );
  }

  private formatSuccessResponse(data: any): any {
    return {
      success: true,
      message: 'Solicitud exitosa',
      errors: null,
      data: data ? data : [],
    };
  }

  private handleError(error: any): Observable<never> {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof HttpException ? error.message : 'Error interno en el servidor';
    const errors = this.formatErrors(error);

    return throwError(
      () =>
        new HttpException(
          {
            success: false,
            message,
            errors,
            data: [],
          },
          status,
        ),
    );
  }

  private formatErrors(error: any): any[] {
    if (error instanceof AxiosError) {
      return [
        {
          message: error.message,
          name: error.name,
          stack: error.stack,
          config: error.config,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
        },
      ];
    } else if (error instanceof HttpException) {
      const response = error.getResponse();
      const errorResponse =
        typeof response === 'object' && response !== null
          ? response
          : { message: response };
      return [
        {
          message: error.message,
          ...errorResponse,
        },
      ];
    } else {
      return [{ message: error.message }];
    }
  }
}
