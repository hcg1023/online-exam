import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Grade } from './entities/grade.entity';
import { GradeVO } from './entities/grade.vo.entity';
import { plainToInstance } from 'class-transformer';
import { ListGradeDto } from './dto/list-grade.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';
import { SubjectBaseVO } from '../subject/entities/subject.vo.entity';
import { Subject } from '../subject/entities/subject.entity';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private gradesRepository: Repository<Grade>,
    private subjectService: SubjectService,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const grade = await this.gradesRepository.save({
      ...createGradeDto,
      subjects: createGradeDto.subjects?.map((id) => ({ id })) ?? [],
    });
    return plainToInstance(GradeVO, grade);
  }

  async findAll(query: ListGradeDto) {
    const list = await this.gradesRepository.find({
      where: {
        title: query.title ? Like(`%${query.title}%`) : null,
      },
      relations: {
        subjects: {
          grades: false,
          questions: false,
        },
      },
      ...getRepositoryPaginationParams(query),
    });
    return plainToInstance(GradeVO, list);
  }

  async getGradeSubjects(id: string) {
    const grade = await this.gradesRepository.findOne({
      where: {
        id,
      },
      relations: {
        subjects: true,
      },
    });
    return plainToInstance(SubjectBaseVO, grade.subjects);
  }

  async findOne(id: string) {
    const grade = await this.gradesRepository.findOne({
      where: {
        id,
      },
      relations: {
        subjects: true,
      },
    });
    return plainToInstance(GradeVO, grade);
  }

  async update(updateGradeDto: UpdateGradeDto) {
    const grade = await this.gradesRepository.findOne({
      where: {
        id: updateGradeDto.id,
      },
      relations: {
        subjects: {
          grades: false,
          questions: false,
        },
      },
    });
    if (updateGradeDto.title) {
      grade.title = updateGradeDto.title;
    }
    if (updateGradeDto.subjects) {
      grade.subjects = updateGradeDto.subjects?.map((id) =>
        this.subjectService.subjectsRepository.create({ id }),
      );
    }
    await this.gradesRepository.save(grade);
    return this.findOne(updateGradeDto.id);
  }

  async remove(id: string) {
    const grade = await this.gradesRepository.findOne({
      where: {
        id,
      },
    });
    if (!grade) {
      throw new InternalServerErrorException('grade is not defined');
    }
    await this.gradesRepository.remove(grade);
    return true;
  }
}
