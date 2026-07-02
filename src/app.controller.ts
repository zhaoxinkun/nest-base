import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { AppService } from '@/app.service';
import type { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 测试res
  @Get('name')
  getName(@Res() response: Response) {
    response.status(200).send('my name is akin');
  }

  // 测试req
  @Get('find')
  findAll(@Req() request: Request): string {
    return 'this is find all';
  }

  // 通配符
  @Get('find/*')
  findOne(@Req() request: Request, @Res() response: Response) {
    response.status(200).send('my find one');
  }

  // 测试重定向
  @Get('cat')
  @Redirect('https://nestjs.com', 301)

  // 测试状态吗
  @Post('find')
  @HttpCode(200)
  createOne() {
    return 'this is add new cat';
  }

  // 测试响应头
  @Post()
  @Header('Cache-Control', 'no-store')
  create() {
    return 'This action adds a new cat';
  }
}
