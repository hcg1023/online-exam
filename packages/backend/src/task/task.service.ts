import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { TestPaperService } from '../test-paper/test-paper.service';
import { ListTaskDto } from './dto/list-task.dto';
import { TaskBaseVO, TaskVO } from './entities/task.vo.entity';
import { plainToInstance } from 'class-transformer';
import { GradeService } from '../grade/grade.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) public tasksRepository: Repository<Task>,
    private testPaperService: TestPaperService,
    private gradesService: GradeService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const { id } = await this.tasksRepository.save({
      ...createTaskDto,
      grade: {
        id: createTaskDto.grade,
      },
      testPapers: createTaskDto.testPapers.map((id) =>
        this.testPaperService.testPapersRepository.create({ id }),
      ),
    });
    return this.findOne(id);
  }

  async findAll(query: ListTaskDto): Promise<[TaskVO[], number]> {
    const [list, total] = await this.tasksRepository.findAndCount({
      where: {
        title: query.title ? Like(`%${query.title}%`) : null,
        grade: query.grade ? { id: query.grade } : null,
        startDate: query.startDate
          ? MoreThanOrEqual(new Date(query.startDate))
          : null,
        endDate: query.endDate
          ? LessThanOrEqual(new Date(query.endDate))
          : null,
      },
      relations: {
        grade: true,
        testPapers: true,
      },
      order: {
        createdDate: 'DESC',
      },
    });
    return [plainToInstance(TaskVO, list), total];
  }

  async findBaseTaskWhereId(id: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });
    return plainToInstance(TaskBaseVO, task);
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
      relations: {
        grade: true,
        testPapers: true,
      },
    });
    return plainToInstance(TaskVO, task);
  }

  async update(updateTaskDto: UpdateTaskDto) {
    const { id, testPapers, grade, ...otherUpdateTask } = updateTaskDto;
    const oldTask = await this.tasksRepository.findOne({
      where: {
        id,
      },
      relations: {
        grade: true,
        testPapers: true,
      },
    });
    if (grade && grade !== oldTask.grade.id) {
      oldTask.grade = this.gradesService.gradesRepository.create({ id: grade });
    }
    if (testPapers) {
      oldTask.testPapers = testPapers.map((id) =>
        this.testPaperService.testPapersRepository.create({ id }),
      );
    }
    const newTask = this.tasksRepository.merge(oldTask, otherUpdateTask);
    await this.tasksRepository.save(newTask);
    return this.findOne(updateTaskDto.id);
  }

  async remove(id: string) {
    const task = await this.tasksRepository.findOne({
      where: {
        id,
      },
    });
    if (!task) {
      throw new InternalServerErrorException('task is not defined');
    }
    await this.tasksRepository.remove(task);
    return true;
  }
}
