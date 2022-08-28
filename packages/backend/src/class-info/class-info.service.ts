import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClassInfoDto } from './dto/create-class-info.dto';
import { UpdateClassInfoDto } from './dto/update-class-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EqualOperator, Like, Repository } from 'typeorm';
import { ClassInfo } from './entities/class-info.entity';
import { plainToInstance } from 'class-transformer';
import { ClassInfoVO } from './entities/class-info.vo.entity';
import { ListClassInfoDto } from './dto/list-class-info.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';

@Injectable()
export class ClassInfoService {
  constructor(
    @InjectRepository(ClassInfo)
    private classInfosRepository: Repository<ClassInfo>,
  ) {}

  async create(createClassInfoDto: CreateClassInfoDto) {
    const { id } = await this.classInfosRepository.save({
      ...createClassInfoDto,
      grade: {
        id: createClassInfoDto.grade,
      },
    });
    const classInfo = await this.findOne(id);
    return plainToInstance(ClassInfoVO, classInfo);
  }

  async findAll(query?: ListClassInfoDto) {
    const list = await this.classInfosRepository.find({
      where: {
        name: query.name ? Like(`%${query.name}%`) : null,
      },
      relations: {
        grade: {
          classInfos: false,
          subjects: true,
        },
      },
      ...getRepositoryPaginationParams(query),
    });
    return plainToInstance(ClassInfoVO, list);
  }

  async findOne(id: string) {
    const classInfo = await this.classInfosRepository.findOne({
      where: {
        id,
      },
      relations: {
        grade: {
          classInfos: false,
          subjects: true,
        },
      },
    });
    return plainToInstance(ClassInfoVO, classInfo);
  }

  async update(updateClassInfoDto: UpdateClassInfoDto) {
    await this.classInfosRepository.update(
      {
        id: updateClassInfoDto.id,
      },
      {
        ...updateClassInfoDto,
        grade: {
          id: updateClassInfoDto.grade,
        },
      },
    );
    return this.findOne(updateClassInfoDto.id);
  }

  async remove(id: string) {
    const classInfo = await this.classInfosRepository.findOne({
      where: {
        id,
      },
    });
    if (!classInfo) {
      throw new InternalServerErrorException('class is not defined');
    }
    await this.classInfosRepository.remove(classInfo);
    return true;
  }
}
