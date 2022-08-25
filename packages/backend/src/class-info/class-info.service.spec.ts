import { Test, TestingModule } from '@nestjs/testing';
import { ClassInfoService } from './class-info.service';

describe('ClassInfoService', () => {
  let service: ClassInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassInfoService],
    }).compile();

    service = module.get<ClassInfoService>(ClassInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
