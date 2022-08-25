import { Test, TestingModule } from '@nestjs/testing';
import { TestPaperService } from './test-paper.service';

describe('TestPaperService', () => {
  let service: TestPaperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestPaperService],
    }).compile();

    service = module.get<TestPaperService>(TestPaperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
