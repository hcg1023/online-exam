import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionAnswer } from './entities/question.answer.entity';
import { plainToInstance } from 'class-transformer';
import { AnswerVO } from './entities/answer.vo.entity';
import { GetWaitingForCorrectionTestPaperListDto } from './dto/get-waiting-for-correction-test-paper-list.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';
import { TeacherTestPaperVO } from './entities/teacher-test-paper.vo.entity';
import { TestPaperAndAnswerVO } from '../student/entities/test-paper-and-answer.vo.entity';
import { QueryTaskTestPaperVO } from '../student/entities/query-task-test-paper.vo.entity';
import { TaskService } from '../task/task.service';
import { TestPaperService } from '../test-paper/test-paper.service';
import { JudgeAnswerDto } from './dto/judge-answer.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) public answersRepository: Repository<Answer>,
    @InjectRepository(QuestionAnswer)
    public questionAnswerRepository: Repository<QuestionAnswer>,
    private taskService: TaskService,
    private testPaperService: TestPaperService,
    private userService: UserService,
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

  async findCorrectionTestPaperList(
    query: GetWaitingForCorrectionTestPaperListDto,
    correctStatus: boolean,
  ): Promise<[TeacherTestPaperVO[], number]> {
    const [list, total] = await this.answersRepository.findAndCount({
      where: {
        correctStatus,
        createdUser:
          query.grade || query.classInfo
            ? {
                grade: query.grade
                  ? {
                      id: query.grade,
                    }
                  : null,
                classInfo: query.classInfo ? { id: query.classInfo } : null,
              }
            : null,
        testPaper: query.subject
          ? {
              subject: { id: query.subject },
            }
          : null,
      },
      order: {
        createdDate: 'DESC',
      },
      relations: {
        createdUser: {
          grade: true,
          classInfo: true,
        },
        testPaper: {
          subject: true,
          questionGroups: {
            questions: true,
          },
        },
        questionAnswers: {
          question: true,
        },
        task: true,
      },
      ...getRepositoryPaginationParams(query),
    });
    const result = list.map((answerGroup) => {
      const answerVo = plainToInstance(AnswerVO, answerGroup);
      const testPaper = plainToInstance(
        TeacherTestPaperVO,
        answerGroup.testPaper,
      );
      testPaper.score = answerVo.score;
      testPaper.student = answerGroup.createdUser;
      testPaper.questionTotal = answerVo.questionTotal;
      testPaper.correctQuestionTotal = answerVo.correctQuestionTotal;
      testPaper.duration = answerGroup.duration;
      testPaper.submitTime = answerGroup.createdDate;
      testPaper.task = answerGroup.task;
      return testPaper;
    });
    return [result, total];
  }

  async findWaitingForCorrectionTestPaperList(
    query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    return this.findCorrectionTestPaperList(query, false);
  }

  async findCorrectedTestPaperList(
    query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    return this.findCorrectionTestPaperList(query, true);
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
            questionAnswers: {
              question: true,
            },
            createdUser: true,
            correctTeacher: true,
          }
        : null,
    });
    return plainToInstance(AnswerVO, answer);
  }

  async getTestPaperInfo(taskId: string, testPaperId: string) {
    const [task, testPaper] = await Promise.all([
      this.taskService.findBaseTaskWhereId(taskId),
      this.testPaperService.findOne(testPaperId),
    ]);
    return plainToInstance(QueryTaskTestPaperVO, { ...testPaper, task });
  }

  async getTestPaperAndAnswer(
    taskId: string,
    testPaperId: string,
    userId: number,
  ) {
    const [testPaper, answer] = await Promise.all([
      this.getTestPaperInfo(taskId, testPaperId),
      this.findOneFromTaskAndTestPaperAndUser(
        taskId,
        testPaperId,
        userId,
        true,
      ),
    ]);
    return plainToInstance(TestPaperAndAnswerVO, {
      testPaper,
      answer,
    });
  }

  async handleJudgeAnswer(judgeAnswerDto: JudgeAnswerDto) {
    const { answerId, questionAnswers, createdUser } = judgeAnswerDto;
    const answer = await this.answersRepository.findOne({
      where: {
        id: answerId,
      },
      relations: {
        questionAnswers: {
          question: true,
        },
      },
    });
    const newQuestionAnswers = answer.questionAnswers.map((questionAnswer) => {
      if (questionAnswer.correctStatus) {
        return questionAnswer;
      }
      questionAnswer.score = questionAnswers.find(
        (item) => item.id === questionAnswer.question.id,
      ).score;
      questionAnswer.correctStatus = true;
      questionAnswer.correctTeacher = this.userService.usersRepository.create({
        id: createdUser,
      });
      return questionAnswer;
    });
    await this.questionAnswerRepository.save(newQuestionAnswers);
    answer.questionAnswers = newQuestionAnswers;
    answer.correctStatus = true;
    await this.answersRepository.save(answer);
    return true;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
