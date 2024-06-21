import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AxiosError } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.formatSuccessResponse(data)),
      catchError((error) => from(this.handleError(error)).pipe(
        switchMap(errResponse => throwError(() => new HttpException(errResponse, errResponse.status)))
      )),
    );
  }

  private formatSuccessResponse(data: any): any {
    return {
      success: true,
      message: 'Solicitud exitosa',
      errors: null,
      data: data ? data : {},
    };
  }

  private async handleError(error: any): Promise<any> {
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      error instanceof HttpException
        ? error.message
        : 'Error interno en el servidor';
    const errors = this.formatErrors(error);

    const errorResponse = {
      success: false,
      message: message || 'Mensaje no proporcionado',
      errors: errors || [{ message: 'Error no proporcionado' }],
      data: {},
      status,
    };

    const now = new Date();
    const datetime = now.toLocaleString();
    await this.prisma.apiResponse.create({
      data: {
        timestamp: datetime,
        success: errorResponse.success,
        message: errorResponse.message,
        errors: JSON.stringify(errorResponse.errors),
        data: JSON.stringify(errorResponse.data),
      },
    });

    return errorResponse;
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
