import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Password } from './entities/password.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { ViewUserDto } from './dto/view-user.dto';
import { encrypt } from '../common/bcrypt';
import { User as UserDecorator } from '../auth/user.decorator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Password)
    private passwordsRepository: Repository<Password>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.findOne(createUserDto.username);
    if (hasUser) {
      return new HttpException('用户名已存在', 200);
    }
    const password = await this.passwordsRepository.save({
      value: encrypt(createUserDto.password),
    });
    const user = await this.usersRepository.save({
      ...createUserDto,
      password,
    });
    const result = new ViewUserDto();
    result.id = user.id;
    result.username = user.username;
    result.identity = user.identity;
    return result;
  }

  async findAll() {
    const all = await this.usersRepository.find();
    return all;
  }

  findOne<T extends boolean | undefined>(
    username: string,
    forcePassword?: T,
  ): Promise<T extends true ? User : ViewUserDto>;
  findOne<T extends boolean | undefined>(
    id: number,
    forcePassword?: T,
  ): Promise<T extends true ? User : ViewUserDto>;
  async findOne(
    idOrName: number | string,
    forcePassword = false,
  ): Promise<any> {
    const where: FindOptionsWhere<User> = {};
    if (typeof idOrName === 'string') {
      where.username = idOrName;
    } else {
      where.id = idOrName;
    }
    const user = await this.usersRepository.findOne({
      where,
      select: ['id', 'identity', 'username'],
      relations: forcePassword ? ['password'] : [],
    });
    if (!user) {
      return null;
    }
    return user;
  }

  update(updateUserDto: UpdateUserDto) {
    return `This action updates a #${updateUserDto.id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
