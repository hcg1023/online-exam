import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Equal, Like, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { QuestionVO } from './entities/question.vo.entity';
import { ListQuestionDto } from './dto/list-question.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { id } = await this.questionsRepository.save({
      ...createQuestionDto,
      grade: { id: createQuestionDto.grade },
      subject: { id: createQuestionDto.subject },
    });
    return this.findOne(id);
  }

  async findAll(query: ListQuestionDto) {
    const list = await this.questionsRepository.find({
      where: {
        title: query.title ? Like(`%${query.title}%`) : null,
        id: query.id ? Equal(query.id) : null,
        type: query.type ? (Equal(query.type) as any) : null,
        grade: query.gradeId
          ? {
              id: Equal(query.gradeId),
            }
          : null,
        subject: query.subjectId
          ? {
              id: Equal(query.subjectId),
            }
          : null,
      },
      relations: {
        grade: true,
        subject: true,
      },
      ...getRepositoryPaginationParams(query),
    });
    return plainToInstance(QuestionVO, list);
  }

  async findOne(id: number) {
    const question = await this.questionsRepository.findOne({
      where: {
        id,
      },
      relations: {
        grade: true,
        subject: true,
      },
    });
    return plainToInstance(QuestionVO, question);
  }

  async update(updateQuestionDto: UpdateQuestionDto) {
    await this.questionsRepository.update(
      {
        id: updateQuestionDto.id,
      },
      {
        ...updateQuestionDto,
        grade: updateQuestionDto.grade
          ? {
              id: updateQuestionDto.grade,
            }
          : undefined,
        subject: updateQuestionDto.subject
          ? { id: updateQuestionDto.subject }
          : undefined,
      },
    );
    return this.findOne(updateQuestionDto.id);
  }

  async remove(id: number) {
    const question = await this.questionsRepository.findOne({
      where: {
        id,
      },
    });
    if (!question) {
      throw new InternalServerErrorException('question is not defined');
    }
    await this.questionsRepository.remove(question);
    return true;
  }
}
