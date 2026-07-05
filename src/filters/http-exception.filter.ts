import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.log('🚀 ~ catch ~ ctx: ', ctx);
    const request = ctx.getRequest();
    console.log('🚀 ~ catch ~ request: ', request);
    const response = ctx.getResponse();
    console.log('🚀 ~ catch ~ response: ', response);
  }
}
