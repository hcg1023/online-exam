import { UserVO } from '../../user/entities/user.vo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { QuestionVO } from '../../question/entities/question.vo.entity';

export class QuestionAnswerVO {
  id: string;

  options?: string[];

  answer: string;

  correctStatus: boolean;

  score: number;

  @Type(() => QuestionVO)
  question: QuestionVO;

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get questionId() {
    return this.question.id;
  }
}

export class AnswerVO {
  id: string;

  duration: number;

  correctStatus: boolean;

  @Type(() => QuestionAnswerVO)
  questionAnswers: QuestionAnswerVO[];

  @Type(() => UserVO)
  createdUser: UserVO;

  @Type(() => UserVO)
  correctTeacher: UserVO;

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get questionTotal() {
    return this.questionAnswers?.length ?? 0;
  }
  set questionTotal(num) {
    // fix
  }

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get correctQuestionTotal() {
    return (
      this.questionAnswers?.filter(
        (answer) =>
          answer.correctStatus && answer.score === answer.question.score,
      ).length ?? 0
    );
  }
  set correctQuestionTotal(num) {
    // fix
  }

  @ApiProperty({
    type: 'number',
  })
  @Expose()
  get score() {
    return this.questionAnswers?.reduce((result, answer) => {
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
