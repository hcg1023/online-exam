import { UserVO } from '../../user/entities/user.vo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get questionTotal() {
    return this.questionAnswers.length;
  }
  set questionTotal(num) {
    // fix
  }

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get correctQuestionTotal() {
    return this.questionAnswers.filter((answer) => answer.correctStatus).length;
  }
  set correctQuestionTotal(num) {
    // fix
  }

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get score() {
    return this.questionAnswers.reduce((result, answer) => {
      if (answer.correctStatus) {
        result += answer.score;
      }
      return result;
    }, 0);
  }
  set score(num) {
    // fix
  }
}
