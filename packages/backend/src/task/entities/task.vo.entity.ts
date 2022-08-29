import { GradeBaseVO } from '../../grade/entities/grade.vo.entity';
import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';

export class TaskVO {
  id: string;
  title: string;
  grade: GradeBaseVO;
  testPapers: TestPaperVO[];
}
