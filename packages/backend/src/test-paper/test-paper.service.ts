import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TestPaper } from './entities/test-paper.entity';
import { QuestionGroup } from './entities/question-group.entity';
import { plainToInstance } from 'class-transformer';
import { TestPaperVO } from './entities/test-paper.vo.entity';
import { ListTestPaperDto } from './dto/list-test-paper.dto';
import { getRepositoryPaginationParams } from '../common/paginated.dto';

@Injectable()
export class TestPaperService {
  constructor(
    @InjectRepository(TestPaper)
    public testPapersRepository: Repository<TestPaper>,
    @InjectRepository(QuestionGroup)
    private questionGroupRepository: Repository<QuestionGroup>,
  ) {}

  async create(createTestPaperDto: CreateTestPaperDto) {
    const { questionGroups, subject, createdUser, ...createTestPaper } =
      createTestPaperDto;
    const newQuestionGroups = questionGroups.map((item) =>
      this.questionGroupRepository.create({
        ...item,
        questions: item.questions.map((id) => ({ id })),
      }),
    );
    const questionGroupsCreated = await this.questionGroupRepository.save(
      newQuestionGroups,
    );
    const testPaperCreated = await this.testPapersRepository.create({
      ...createTestPaper,
      questionGroups: questionGroupsCreated,
      subject: {
        id: subject,
      },
      createdUser: {
        id: createdUser,
      },
    });
    const { id } = await this.testPapersRepository.save(testPaperCreated);
    return this.findOne(id);
  }

  async findAll(query: ListTestPaperDto): Promise<[TestPaperVO[], number]> {
    const [list, total] = await this.testPapersRepository.findAndCount({
      where: {
        title: query.title ? Like(`%${query.title}%`) : null,
        subject: query.subject ? { id: query.subject } : null,
        createdUser: query.createdUser ? { id: query.createdUser } : null,
      },
      relations: {
        subject: true,
        questionGroups: {
          questions: true,
        },
        createdUser: true,
      },
      order: {
        createdDate: 'DESC',
      },
      ...getRepositoryPaginationParams(query),
    });
    return [plainToInstance(TestPaperVO, list), total];
  }

  async findOne(id: string) {
    const testPaper = await this.testPapersRepository.findOne({
      where: {
        id,
      },
      relations: {
        subject: true,
        questionGroups: {
          questions: true,
        },
        createdUser: true,
      },
    });
    return plainToInstance(TestPaperVO, testPaper);
  }

  async update(updateTestPaperDto: UpdateTestPaperDto) {
    const { questionGroups, id, subject, ...updateTestPaper } =
      updateTestPaperDto;
    const testPaper = await this.testPapersRepository.findOne({
      where: {
        id,
      },
      relations: {
        questionGroups: true,
      },
    });
    const newQuestionGroups = questionGroups.map((item) =>
      this.questionGroupRepository.create({
        ...item,
        questions: item.questions.map((id) => ({ id })),
      }),
    );
    const questionGroupsCreated = await this.questionGroupRepository.save(
      newQuestionGroups,
    );
    testPaper.questionGroups = questionGroupsCreated;
    this.testPapersRepository.merge(testPaper, updateTestPaper);
    await this.questionGroupRepository.save(testPaper);
    return this.findOne(id);
  }

  async remove(id: string) {
    const testPaper = await this.testPapersRepository.findOne({
      where: {
        id,
      },
      relations: {
        questionGroups: true,
      },
    });
    if (!testPaper) {
      throw new InternalServerErrorException('test-paper is not defined');
    }
    await this.testPapersRepository.remove(testPaper);
    return true;
  }
}
