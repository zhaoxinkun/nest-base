import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDao } from '@/user/user.dao';
import { Logger as PinoLogger } from 'nestjs-pino';

@Injectable()
export class UserService {
  constructor(
    private readonly userDao: UserDao,
    private readonly logger: PinoLogger,
  ) {}

  // nest内置的日志
  // private readonly logger = new Logger(UserService.name);

  create(createUserDto: CreateUserDto) {
    // this.logger.warn('hello');内置日志
    return this.userDao.createUser(createUserDto);
  }

  findAll() {
    // 使用pino日志
    this.logger.warn('Get all users');
    return this.userDao.findAll();
  }

  findOne(id: number) {
    return this.userDao.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userDao.updateUser(id, updateUserDto);
  }

  remove(id: number) {
    return this.userDao.deleteUser(id);
  }

  findLogsGroupBy(id: number) {
    return this.userDao.findLogsGroupBy(id);
  }
}
