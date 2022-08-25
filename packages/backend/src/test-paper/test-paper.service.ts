import { Injectable } from '@nestjs/common';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';

@Injectable()
export class TestPaperService {
  create(createTestPaperDto: CreateTestPaperDto) {
    return 'This action adds a new testPaper';
  }

  findAll() {
    return `This action returns all testPaper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testPaper`;
  }

  update(id: number, updateTestPaperDto: UpdateTestPaperDto) {
    return `This action updates a #${id} testPaper`;
  }

  remove(id: number) {
    return `This action removes a #${id} testPaper`;
  }
}
