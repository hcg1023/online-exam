import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';
import { UserVO } from '../../user/entities/user.vo.entity';

export class TeacherTestPaperVO extends TestPaperVO {
  /*
   * 得分
   * */
  score: number;

  /*
   * 题目数量
   * */
  questionTotal: number;

  /*
   * 正确数量
   * */
  correctQuestionTotal: number;

  duration: number;

  student: UserVO;

  submitTime: Date;
}
