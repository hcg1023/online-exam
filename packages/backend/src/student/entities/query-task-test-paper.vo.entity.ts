import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';
import { TaskBaseVO } from '../../task/entities/task.vo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class QueryTaskTestPaperVO extends TestPaperVO {
  @ApiProperty()
  task: TaskBaseVO;
}
