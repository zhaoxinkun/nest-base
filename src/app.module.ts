import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import Configurations from '@/common/config/configurations';
import Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from '@/user/entities/user.entity';
import { Profile } from '@/user/profile.entity';
import { Log } from '@/logs/log.entity';
import { Role } from '@/roles/roles.entity';
import { LoggerModule as PinoModule } from 'nestjs-pino';

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
        database: configService.get('DB_DATABASE'),
        entities: [User, Profile, Log, Role],
        autoLoadEntities: true,
        logging: ['warn', 'error'],
        synchronize: configService.get('DB_SYNC'),
      }),
    }),
    UserModule,
    // 使用pino日志
    PinoModule.forRoot({
      pinoHttp: {
        transport: {
          targets: [
            {
              target: 'pino-pretty', //日志格式化
              options: {
                colorize: true, //打开颜色
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss', //格式话时间
                ignore: 'pid,hostname', // 是否显示进程id和主机名
                singleLine: true,
              },
            },
            {
              target: 'pino-roll', //日志滚动输出
              options: {
                mkdir: true, // 必须开启自动创建目录
                file: './logs/app.log', // 必须指定文件路径
                interval: '1d', // 每天滚动
                maxFiles: 7, // 保留最近 7 个日志文件
                colorize: true, // 文件里不需要彩色
              },
            },
          ],
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
