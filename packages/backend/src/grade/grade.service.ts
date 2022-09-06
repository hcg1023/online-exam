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
import { SubjectService } from '../subject/subject.service';
import { ClassInfoBaseVO } from '../class-info/entities/class-info.vo.entity';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    public gradesRepository: Repository<Grade>,
    private subjectService: SubjectService,
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    const grade = await this.gradesRepository.save({
      ...createGradeDto,
      subjects: createGradeDto.subjects?.map((id) => ({ id })) ?? [],
    });
    return plainToInstance(GradeVO, grade);
  }

  async findAll(query: ListGradeDto): Promise<[GradeVO[], number]> {
    const [list, total] = await this.gradesRepository.findAndCount({
      where: {
        title: query.title ? Like(`%${query.title}%`) : null,
      },
      relations: {
        subjects: {
          grades: false,
          questions: false,
        },
      },
      order: {
        createdDate: 'DESC',
      },
      ...getRepositoryPaginationParams(query),
    });
    return [plainToInstance(GradeVO, list), total];
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

  async getGradeClassInfos(id: string) {
    const grade = await this.gradesRepository.findOne({
      where: {
        id,
      },
      relations: {
        classInfos: true,
      },
    });
    return plainToInstance(ClassInfoBaseVO, grade.classInfos);
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
      relations: {
        subjects: true,
        classInfos: true,
        questions: true,
      },
    });
    if (!grade) {
      throw new InternalServerErrorException('grade is not defined');
    }
    if (grade.classInfos.length) {
      throw new InternalServerErrorException(
        '存在使用的班级，请解除关联再删除',
      );
    }
    if (grade.questions.length) {
      throw new InternalServerErrorException(
        '存在关联的题目，请解除关联再删除',
      );
    }

    try {
      await this.gradesRepository.remove(grade);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
    return true;
  }
}
