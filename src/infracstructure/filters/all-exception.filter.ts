import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Error interno del servidor';

    let errors = [];
    if (exception instanceof HttpException) {
      const responseError = exception.getResponse();
      errors =
        typeof responseError === 'object' && responseError !== null
          ? responseError['errors']
            ? responseError['errors']
            : [{ message: responseError }]
          : [{ message: responseError }];
    } else {
      errors = [{ message }];
    }

    response.status(status).json({
      success: false,
      message,
      errors,
      data: [],
    });
  }
}
