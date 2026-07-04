import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '@/enum/config.enum';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    // 动态读取env的文件数据
    const db_url = this.configService.get<string>(ConfigEnum.DB_URL);
    // 配置读取yml文件格式的数据
    // const db_url = this.configService.get<string>('http.host');

    console.log('🚀 ~ getHello ~ db: ', db_url);

    return 'Hello World!';
  }
  getName(): string {
    return 'my name is akin';
  }
}
