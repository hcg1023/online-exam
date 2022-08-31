import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';
import { TaskBaseVO } from '../../task/entities/task.vo.entity';

export class QueryTaskTestPaperVO extends TestPaperVO {
  task: TaskBaseVO;
}
