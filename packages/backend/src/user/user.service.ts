import {
  ClassSerializerInterceptor,
  HttpException,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Password } from './entities/password.entity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { encrypt } from '../common/bcrypt';
import { GradeService } from '../grade/grade.service';
import { ClassInfoService } from '../class-info/class-info.service';
import { UserVO } from './entities/user.vo.entity';

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
      return new HttpException('用户名已存在', 200);
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
    return user;
  }

  async findAll() {
    return this.usersRepository.find();
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
        grade: {
          subjects: false,
          classInfos: false,
        },
        classInfo: {
          grade: false,
          testPapers: false,
        },
      },
    });
    if (!user) {
      return null;
    }
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
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
