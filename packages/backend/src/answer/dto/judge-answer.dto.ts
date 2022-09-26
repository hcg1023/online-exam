import { Type } from 'class-transformer';
import { IsArray, IsEmpty, IsInt, IsNumber, IsString } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class JudgeQuestionAnswer {
  @IsNumber()
  id: number;
  @IsInt()
  @Type(() => Number)
  score: number;
}

export class JudgeAnswerDto {
  @IsString()
  answerId: string;

  @IsArray()
  @Type(() => JudgeQuestionAnswer)
  questionAnswers: JudgeQuestionAnswer[];

  @ApiHideProperty()
  @IsEmpty()
  createdUser: number;
}
