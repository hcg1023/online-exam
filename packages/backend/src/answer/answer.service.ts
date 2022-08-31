import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionAnswer } from './entities/question.answer.entity';
import { plainToInstance } from 'class-transformer';
import { AnswerVO } from './entities/answer.vo.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) public answersRepository: Repository<Answer>,
    @InjectRepository(QuestionAnswer)
    public questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}

  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  findAll() {
    return `This action returns all answer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  async findOneFromTaskAndTestPaperAndUser(
    taskId: string,
    testPaperId: string,
    userId: number,
    relation = false,
  ) {
    const answer = await this.answersRepository.findOne({
      where: {
        task: {
          id: taskId,
        },
        testPaper: {
          id: testPaperId,
        },
        createdUser: {
          id: userId,
        },
      },
      relations: relation
        ? {
            questionAnswers: true,
            createdUser: true,
            correctTeacher: true,
          }
        : null,
    });
    return plainToInstance(AnswerVO, answer);
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
