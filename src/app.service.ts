import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    // 动态读取不同启动配置下的数据
    const db_url = this.configService.get<string>(ConfigEnum.DB_URL);
    console.log('🚀 ~ getHello ~ db: ', db_url);
    return 'Hello World!';
  }
  getName(): string {
    return 'my name is akin';
  }
}
