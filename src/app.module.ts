import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import Configurations from '@/common/config/configurations';

// 动态配置env的地址
const envFilePath = [`.env.${process.env.NODE_ENV} ?? "development`, '.env'];
// console.log('🚀 ~  ~ envFilePath: ', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath,
      load: [Configurations],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
