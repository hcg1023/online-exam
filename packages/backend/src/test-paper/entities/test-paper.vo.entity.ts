import { SubjectBaseVO } from '../../subject/entities/subject.vo.entity';
import { QuestionGroupVO } from './question-group.vo.entity';
import { UserVO } from '../../user/entities/user.vo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TestPaperVO {
  id: string;

  title: string;

  minute: string;

  createdUser: UserVO;

  subject: SubjectBaseVO;

  questionGroups: QuestionGroupVO[];

  @ApiProperty({
    type: 'number',
    description: '试卷总分',
  })
  @Expose()
  get totalScore() {
    return this.questionGroups.reduce((total, groups) => {
      return groups.questions.reduce((total, question) => {
        return total + question.score;
      }, total);
    }, 0);
  }
  set totalScore(value: number) {
    // fix
  }
}
