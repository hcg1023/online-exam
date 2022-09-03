import { Type } from 'class-transformer';
import { IsEmpty } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class JudgeQuestionAnswer {
  id: string;
  score: number;
}

export class JudgeAnswerDto {
  answerId: string;

  @Type(() => JudgeQuestionAnswer)
  questionAnswers: JudgeQuestionAnswer[];

  @ApiHideProperty()
  @IsEmpty()
  createdUser: number;
}
