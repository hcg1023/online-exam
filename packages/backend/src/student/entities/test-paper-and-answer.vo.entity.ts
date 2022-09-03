import { AnswerVO } from '../../answer/entities/answer.vo.entity';
import { QueryTaskTestPaperVO } from './query-task-test-paper.vo.entity';
import { Type } from 'class-transformer';

export class TestPaperAndAnswerVO {
  @Type(() => QueryTaskTestPaperVO)
  testPaper: QueryTaskTestPaperVO;

  @Type(() => AnswerVO)
  answer: AnswerVO;
}
