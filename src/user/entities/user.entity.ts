import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Log } from '@/logs/log.entity';
import { Role } from '@/roles/roles.entity';
import { Profile } from '@/user/profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // 一对一的关系
  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn() //外键维护方
  profile: Profile;

  // 一对多的关系
  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];

  // 多对多的关系
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
