import { GradeBaseVO } from '../../grade/entities/grade.vo.entity';
import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';

export class TaskBaseVO {
  id: string;
  title: string;
}

export class TaskVO extends TaskBaseVO {
  grade: GradeBaseVO;
  testPapers: TestPaperVO[];
}
