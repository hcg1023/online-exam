import { SubjectBaseVO } from '../../subject/entities/subject.vo.entity';
import { QuestionGroupVO } from './question-group.vo.entity';
import { UserVO } from '../../user/entities/user.vo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { Grade } from '../../grade/entities/grade.entity';

export class TestPaperVO {
  id: string;

  title: string;

  minute: string;

  createdUser: UserVO;

  @Type(() => Grade)
  grade: Grade;

  @Type(() => SubjectBaseVO)
  subject: SubjectBaseVO;

  @Type(() => QuestionGroupVO)
  @Transform(({ value }) => value.sort((a, b) => a.order - b.order))
  questionGroups: QuestionGroupVO[];

  @ApiProperty({
    type: 'number',
    description: '试卷总分',
  })
  @Expose()
  get totalScore() {
    return this.questionGroups
      ? this.questionGroups.reduce((total, groups) => {
          return groups.questions
            ? groups.questions.reduce((total, question) => {
                return total + question.score;
              }, total)
            : total;
        }, 0)
      : 0;
  }
  set totalScore(value: number) {
    // fix
  }
}
