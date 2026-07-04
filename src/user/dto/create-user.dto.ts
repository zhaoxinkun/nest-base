import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() //不可为空
  @Length(3, 20) //长度限制
  username: string;

  @IsNotEmpty()
  password: string;

  profile?: {
    gender: number;
    photo: string;
    address: string;
  };
}
