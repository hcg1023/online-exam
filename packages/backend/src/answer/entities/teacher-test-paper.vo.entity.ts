import { TestPaperVO } from '../../test-paper/entities/test-paper.vo.entity';
import { UserVO } from '../../user/entities/user.vo.entity';
import { TaskBaseVO } from '../../task/entities/task.vo.entity';

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

  task: TaskBaseVO;

  submitTime: Date;
}
