import { Injectable } from '@nestjs/common';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestPaper } from './entities/test-paper.entity';
import { QuestionGroup } from './entities/question-group.entity';

@Injectable()
export class TestPaperService {
  constructor(
    @InjectRepository(TestPaper)
    private testPapersRepository: Repository<TestPaper>,
    @InjectRepository(QuestionGroup)
    private questionGroupRepository: Repository<QuestionGroup>,
  ) {}

  async create(createTestPaperDto: CreateTestPaperDto) {
    const { questionGroups, subject, createdUser, ...createTestPaper } =
      createTestPaperDto;
    const newQuestionGroups = questionGroups.map(
      this.questionGroupRepository.create,
    );
    const { id } = await this.testPapersRepository.create({
      ...createTestPaper,
      questionGroups: newQuestionGroups,
      subject: {
        id: subject,
      },
      createdUser: {
        id: createdUser,
      },
    });
    return this.findOne(id);
  }

  findAll() {
    return `This action returns all testPaper`;
  }

  async findOne(id: string) {
    await this.testPapersRepository.findOne({
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
    return `This action returns a #${id} testPaper`;
  }

  update(updateTestPaperDto: UpdateTestPaperDto) {
    return `This action updates a # testPaper`;
  }

  remove(id: string) {
    return `This action removes a #${id} testPaper`;
  }
}
