import { UserVO } from '../../user/entities/user.vo.entity';

export class QuestionAnswerVO {
  id: string;

  options?: string[];

  answer: string;

  correctStatus: boolean;

  score: number;
}

export class AnswerVO {
  id: string;

  duration: number;

  correctStatus: boolean;

  questionAnswers: QuestionAnswerVO[];

  createdUser: UserVO;

  correctTeacher: UserVO;
}
