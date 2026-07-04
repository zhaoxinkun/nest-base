import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const db = this.configService.get<string>('DB_NAME');
    console.log('🚀 ~ getHello ~ db: ', db);
    return 'Hello World!';
  }
  getName(): string {
    return 'my name is akin';
  }
}
