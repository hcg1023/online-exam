import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Equal, Like, Repository } from 'typeorm';
import { Password } from './entities/password.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { compare, encrypt } from '../common/bcrypt';
import { GradeService } from '../grade/grade.service';
import { ClassInfoService } from '../class-info/class-info.service';
import { UserVO } from './entities/user.vo.entity';
import { plainToInstance } from 'class-transformer';
import { IdentityEnum } from '../enums';
import { UserListDto } from './dto/user-list.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    private gradeService: GradeService,
    private classInfoService: ClassInfoService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Password)
    private passwordsRepository: Repository<Password>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hasUser = await this.findOne(createUserDto.username);
    if (hasUser) {
      throw new InternalServerErrorException('用户名已存在');
    }
    const password = await this.passwordsRepository.save({
      value: encrypt(createUserDto.password),
    });
    const user = await this.usersRepository.save({
      ...createUserDto,
      grade: {
        id: createUserDto.grade,
      },
      classInfo: {
        id: createUserDto.classInfo,
      },
      createdUser: {
        id: createUserDto.createdUser,
      },
      password,
    });
    return this.findOne(user.id);
  }

  async findAll() {
    const list = await this.usersRepository.find();
    return plainToInstance(UserVO, list);
  }

  async findUserList(
    identity: IdentityEnum,
    query: UserListDto,
  ): Promise<[UserVO[], number]> {
    const [list, total] = await this.usersRepository.findAndCount({
      where: {
        identity: Equal(`${identity}`) as any,
        username: query.username ? Like(`%${query.username}%`) : null,
        name: query.name ? Like(`%${query.name}%`) : null,
      },
      relations:
        identity === IdentityEnum.STUDENT
          ? {
              classInfo: true,
              grade: true,
            }
          : undefined,
      order: {
        createdDate: 'DESC',
      },
      ...getRepositoryPaginationParams(query),
    });

    return [plainToInstance(UserVO, list), total];
  }

  async findOne(idOrName: number | string): Promise<UserVO> {
    const where: FindOptionsWhere<User> = {};
    if (typeof idOrName === 'string') {
      where.username = idOrName;
    } else {
      where.id = idOrName;
    }
    const user = await this.usersRepository.findOne({
      where,
      relations: {
        password: true,
        grade: true,
        classInfo: true,
      },
    });
    if (!user) {
      return null;
    }
    // 不能使用plainInstance
    return new UserVO(user);
  }

  async update(updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(
      {
        id: updateUserDto.id,
      },
      {
        ...updateUserDto,
        grade: updateUserDto.grade
          ? {
              id: updateUserDto.grade,
            }
          : undefined,
        classInfo: updateUserDto.classInfo
          ? {
              id: updateUserDto.classInfo,
            }
          : undefined,
      },
    );
    return this.findOne(updateUserDto.id);
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto) {
    const oldUser = await this.usersRepository.findOne({
      where: {
        id: updatePasswordDto.id,
      },
      relations: {
        password: true,
      },
    });
    if (!oldUser) {
      throw new InternalServerErrorException('user is not defined');
    }
    if (!compare(updatePasswordDto.oldPassword, oldUser.password.value)) {
      throw new InternalServerErrorException('密码错误');
    }
    const newPassword = await this.passwordsRepository.save({
      value: updatePasswordDto.newPassword,
    });
    oldUser.password = newPassword;
    await this.usersRepository.save(oldUser);
    return true;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('user is not defined', 500);
    }
    await this.usersRepository.remove(user);
    return true;
  }
}
