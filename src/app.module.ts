import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import Configurations from '@/common/config/configurations';
import Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// 动态配置env的地址
const envFilePath = [`.env.${process.env.NODE_ENV} ?? "development`, '.env'];
// console.log('🚀 ~  ~ envFilePath: ', envFilePath);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局使用
      envFilePath, //使用env
      // load: [Configurations],配置读取使用yml格式
      validationSchema: Joi.object({
        //使用joi校验
        DB_URL: Joi.string().required(),
        DB_TYPE: Joi.string(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_SYNC: Joi.boolean(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_POST'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        entities: [],
        synchronize: configService.get('DB_SYNC'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
