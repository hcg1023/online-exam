import { Test, TestingModule } from '@nestjs/testing';
import { ClassInfoController } from './class-info.controller';
import { ClassInfoService } from './class-info.service';

describe('ClassInfoController', () => {
  let controller: ClassInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassInfoController],
      providers: [ClassInfoService],
    }).compile();

    controller = module.get<ClassInfoController>(ClassInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
