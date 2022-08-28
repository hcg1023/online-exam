import { SubjectBaseVO } from '../../subject/entities/subject.vo.entity';
import { QuestionGroupVO } from './question-group.vo.entity';
import { UserVO } from '../../user/entities/user.vo.entity';

export class TestPaperVO {
  id: string;

  title: string;

  minute: string;

  createdUser: UserVO;

  subject: SubjectBaseVO;

  questionGroups: QuestionGroupVO[];
}
