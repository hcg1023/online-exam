import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Like, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { SubjectBaseVO } from './entities/subject.vo.entity';
import { ListSubjectDto } from './dto/list-subject.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject) public subjectsRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = await this.subjectsRepository.save(createSubjectDto);
    return plainToInstance(SubjectBaseVO, subject);
  }

  async findAll(query: ListSubjectDto): Promise<[SubjectBaseVO[], number]> {
    const [list, total] = await this.subjectsRepository.findAndCount({
      where: {
        name: query.name ? Like(`%${query.name}%`) : null,
      },
      order: {
        createdDate: 'DESC',
      },
      ...getRepositoryPaginationParams(query),
    });
    return [plainToInstance(SubjectBaseVO, list), total];
  }

  async findOne(id: string) {
    const subject = await this.subjectsRepository.findOne({
      where: {
        id,
      },
    });
    return plainToInstance(SubjectBaseVO, subject);
  }

  async update(updateSubjectDto: UpdateSubjectDto) {
    await this.subjectsRepository.update(
      {
        id: updateSubjectDto.id,
      },
      {
        ...updateSubjectDto,
      },
    );
    return this.findOne(updateSubjectDto.id);
  }

  async remove(id: string) {
    const subject = await this.subjectsRepository.findOne({
      where: {
        id,
      },
    });
    if (!subject) {
      throw new InternalServerErrorException('subject is not defined');
    }
    await this.subjectsRepository.remove(subject);
    return true;
  }
}
