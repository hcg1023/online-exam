import { AnswerVO } from '../../answer/entities/answer.vo.entity';
import { QueryTaskTestPaperVO } from './query-task-test-paper.vo.entity';

export class TestPaperAndAnswerVO {
  testPaper: QueryTaskTestPaperVO;
  answer: AnswerVO;
}
