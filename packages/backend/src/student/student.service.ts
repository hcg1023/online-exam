import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Brackets, In } from 'typeorm';
import { AnswerService } from '../answer/answer.service';
import { UserService } from '../user/user.service';
import { UserVO } from '../user/entities/user.vo.entity';
import { StudentTaskVO } from './entities/student-task.vo.entity';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { plainToInstance } from 'class-transformer';
import { TaskService } from '../task/task.service';
import { QueryTaskListDto } from './dto/query-task-list.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';
import { TestPaperService } from '../test-paper/test-paper.service';
import { QueryTaskTestPaperVO } from './entities/query-task-test-paper.vo.entity';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { QuestionTypeEnum } from '../enums';
import { QuestionVO } from '../question/entities/question.vo.entity';
import { TestPaperAndAnswerVO } from './entities/test-paper-and-answer.vo.entity';

type TaskResolverTestPaperMap = Map<
  string,
  { id: string; status: boolean; totalScore: number }[]
>;

@Injectable()
export class StudentService {
  constructor(
    private taskService: TaskService,
    private testPaperService: TestPaperService,
    private answerService: AnswerService,
    private userService: UserService,
  ) {}

  async getTaskResolverTestPaperMap(user: UserVO, taskIds: string[]) {
    const taskStatus = await this.answerService.answersRepository.find({
      where: {
        createdUser: {
          id: user.id,
        },
        task: {
          id: In(taskIds),
        },
      },
      relations: {
        createdUser: true,
        task: true,
        testPaper: true,
        questionAnswers: true,
      },
    });
    const taskResolverTestPaperMap: TaskResolverTestPaperMap =
      taskStatus.reduce((result, item) => {
        const arr = result.get(item.task.id) ?? [];
        const totalScore = item.questionAnswers.reduce(
          (totalScore, questionAnswer) => {
            return totalScore + (questionAnswer.score ?? 0);
          },
          0,
        );
        arr.push({
          id: item.testPaper.id,
          status: item.correctStatus,
          totalScore,
        });
        result.set(item.task.id, arr);
        return result;
      }, new Map());

    return taskResolverTestPaperMap;
  }

  setTaskTestPaperStatus(
    task: StudentTaskVO,
    taskResolverTestPaperMap: TaskResolverTestPaperMap,
  );
  setTaskTestPaperStatus(
    tasks: StudentTaskVO[],
    taskResolverTestPaperMap: TaskResolverTestPaperMap,
  );
  setTaskTestPaperStatus(
    tasks: StudentTaskVO | StudentTaskVO[],
    taskResolverTestPaperMap: TaskResolverTestPaperMap,
  ) {
    const _tasks = Array.isArray(tasks) ? tasks : [tasks];
    _tasks.forEach((task) => {
      const testPaperIds = taskResolverTestPaperMap.get(task.id) || [];
      task.testPapers.forEach((testPaper) => {
        const statusItem = testPaperIds.find(
          (item) => item.id === testPaper.id,
        );
        if (statusItem) {
          testPaper.status = statusItem.status
            ? TaskStatusEnum.DONE
            : TaskStatusEnum.CORRECT;
          testPaper.doneTotalScore = statusItem.totalScore;
        } else {
          testPaper.status = TaskStatusEnum.UNDONE;
        }
      });
    });
  }

  getStudentTaskQueryBuilder(user: UserVO) {
    return this.taskService.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.grade', 'grade')
      .leftJoinAndSelect('task.testPapers', 'testPaper')
      .where('task.gradeId = :gradeId', {
        gradeId: user.grade.id,
      })
      .andWhere(
        new Brackets((qb) => {
          return qb
            .where(
              new Brackets((qb) => {
                return qb
                  .where('task.startDate = NULL')
                  .orWhere('task.startDate <= CURDATE()');
              }),
            )
            .orWhere(
              new Brackets((qb) => {
                return qb
                  .where('task.endDate = null')
                  .orWhere('task.endDate >= CURDATE()');
              }),
            );
        }),
      );
  }

  async getStudentTaskList(
    query: QueryTaskListDto,
    user: UserVO,
  ): Promise<[StudentTaskVO[], number]> {
    const params = getRepositoryPaginationParams(query);
    const [list, total] = await this.getStudentTaskQueryBuilder(user)
      .skip(params.skip)
      .take(params.take)
      .getManyAndCount();
    const taskIds = list.map((item) => item.id);
    const taskResolverTestPaperMap = await this.getTaskResolverTestPaperMap(
      user,
      taskIds,
    );
    const results = plainToInstance(StudentTaskVO, list);
    this.setTaskTestPaperStatus(results, taskResolverTestPaperMap);
    return [results, total];
  }

  async getTestPaperInfo(taskId: string, testPaperId: string) {
    const [task, testPaper] = await Promise.all([
      this.taskService.findBaseTaskWhereId(taskId),
      this.testPaperService.findOne(testPaperId),
    ]);
    return plainToInstance(QueryTaskTestPaperVO, { ...testPaper, task });
  }

  async submitTestPaperAnswer(createAnswerDto: CreateAnswerDto) {
    // 提交试卷答案
    const {
      taskId,
      testPaperId,
      questionAnswers: questionAnswersInput,
      duration,
      createdUserId,
    } = createAnswerDto;

    const hasAnswer =
      await this.answerService.findOneFromTaskAndTestPaperAndUser(
        taskId,
        testPaperId,
        createdUserId,
      );
    if (hasAnswer) {
      throw new InternalServerErrorException('不可以重复提交同一份试卷');
    }

    const testPaper = await this.testPaperService.findOne(testPaperId);
    const questionMap = testPaper.questionGroups.reduce((map, current) => {
      current.questions.forEach((question) => {
        map.set(question.id, question);
      });
      return map;
    }, new Map<number, QuestionVO>());
    const questionAnswers = questionAnswersInput.map((answerItem) => {
      const question = questionMap.get(answerItem.questionId);
      const questionAnswerInstance =
        this.answerService.questionAnswerRepository.create({
          question: {
            id: answerItem.questionId,
          },
          options: [],
          answer: '',
        });
      switch (question.type) {
        case QuestionTypeEnum.SINGLE_CHOICE:
        case QuestionTypeEnum.JUDGE_QUESTION:
          questionAnswerInstance.options = answerItem.options;
          questionAnswerInstance.correctStatus = true;
          // 单选或者判断，回答正确，获得全部分数
          if (answerItem.options[0] === question.correctOptions[0]) {
            questionAnswerInstance.score = question.score;
          } else {
            questionAnswerInstance.score = 0;
          }
          break;
        case QuestionTypeEnum.MULTIPLE_CHOICE:
        case QuestionTypeEnum.REPLY_QUESTION:
          questionAnswerInstance.options = answerItem.options;
          const isEqual = judgeOptionsIsEqual(
            answerItem.options,
            question.correctOptions,
          );
          // 多选题和填空题完全正确的情况，获得全部分数，否则由教师给分
          if (isEqual) {
            questionAnswerInstance.score = question.score;
            questionAnswerInstance.correctStatus = true;
          } else {
            questionAnswerInstance.correctStatus = false;
          }
          break;
        case QuestionTypeEnum.SHORT_ANSWER:
          questionAnswerInstance.answer = answerItem.answer;
          if (answerItem.answer === question.answer) {
            questionAnswerInstance.score = question.score;
            questionAnswerInstance.correctStatus = true;
          } else {
            questionAnswerInstance.correctStatus = false;
          }
          break;
      }
      return questionAnswerInstance;
    });
    // 如果试题答案都没有待批改，则整条数据直接完成
    const correctStatus = questionAnswers.every(
      (question) => question.correctStatus === true,
    );
    const questionAnswersCreated =
      await this.answerService.questionAnswerRepository.save(questionAnswers);
    const newAnswer = this.answerService.answersRepository.create({
      testPaper: {
        id: testPaperId,
      },
      task: {
        id: taskId,
      },
      createdUser: {
        id: createdUserId,
      },
      questionAnswers: questionAnswersCreated,
      duration,
      correctStatus,
    });

    await this.answerService.answersRepository.save(newAnswer);
    return true;
  }

  async getTestPaperAndAnswer(
    taskId: string,
    testPaperId: string,
    userId: number,
  ) {
    const [testPaper, answer] = await Promise.all([
      this.getTestPaperInfo(taskId, testPaperId),
      this.answerService.findOneFromTaskAndTestPaperAndUser(
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
}

function judgeOptionsIsEqual(options: string[], corrects: string[]) {
  if (options.length === corrects.length) {
    const _options = options.slice().sort();
    const _corrects = corrects.slice().sort();
    let index = 0;
    while (index < _options.length) {
      if (_options[index] !== _corrects[index]) {
        return false;
      }
      index++;
    }
    return true;
  }
  return false;
}
