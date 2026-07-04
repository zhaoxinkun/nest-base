import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import Configurations from '@/common/config/configurations';
import * as joi from 'joi';
import Joi from 'joi';

// 动态配置env的地址
const envFilePath = [`.env.${process.env.NODE_ENV} ?? "development`, '.env'];
// console.log('🚀 ~  ~ envFilePath: ', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath, //使用env
      // load: [Configurations], 使用yml
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
