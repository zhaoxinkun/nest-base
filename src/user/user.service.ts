import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDao } from '@/user/user.dao';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}
  create(createUserDto: CreateUserDto) {
    return this.userDao.createUser(createUserDto);
  }

  findAll() {
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
