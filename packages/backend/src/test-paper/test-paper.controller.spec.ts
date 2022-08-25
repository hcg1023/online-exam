import { Test, TestingModule } from '@nestjs/testing';
import { TestPaperController } from './test-paper.controller';
import { TestPaperService } from './test-paper.service';

describe('TestPaperController', () => {
  let controller: TestPaperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestPaperController],
      providers: [TestPaperService],
    }).compile();

    controller = module.get<TestPaperController>(TestPaperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
