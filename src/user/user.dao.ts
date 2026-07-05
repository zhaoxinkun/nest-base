// 数据访问对象
import { In, Repository } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from '@/logs/log.entity';

export class UserDao {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
    return user!;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    } else {
      await this.userRepository.update(user, updateUserDto);
    }
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    } else {
      await this.userRepository.delete(user);
    }
    return user;
  }

  findLogsGroupBy(id: number) {
    return this.logRepository
      .createQueryBuilder('log')
      .select('log.result', 'result')
      .addSelect('COUNT(log.result)', 'count')
      .leftJoin('log.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('log.result')
      .getRawMany();
  }
}
