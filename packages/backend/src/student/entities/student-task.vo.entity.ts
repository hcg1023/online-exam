import { TaskVO } from '../../task/entities/task.vo.entity';
import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';
import {
  TaskStatusEnum,
  TaskStatusFormatterEnum,
} from '../../enums/task-status.enum';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StudentTestPaperVO extends TestPaperVO {
  status: TaskStatusEnum;

  @ApiProperty({
    type: 'string',
  })
  @Expose()
  get statusName() {
    return TaskStatusFormatterEnum[this.status];
  }
}

export class StudentTaskVO extends TaskVO {
  @Type(() => StudentTestPaperVO)
  testPapers: StudentTestPaperVO[];
}
