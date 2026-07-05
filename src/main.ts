import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from '@/filters/http-exception.filter';
dotenv.config();
// import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    // logger: ['error', 'warn'], 内置日志
    // logger: true,
    bufferLogs: true, // ✅ 容器初始化前的日志
  });
  // app.useLogger(app.get(Logger)); //使用pino日志
  app.useGlobalFilters(new HttpExceptionFilter()); //使用全局过滤器
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
