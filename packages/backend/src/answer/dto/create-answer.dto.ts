import {
  IsArray,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class SubmitExamQuestionAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  options?: string[];

  answer?: string;
}

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;

  @IsString()
  @IsNotEmpty()
  testPaperId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsArray()
  questionAnswers: SubmitExamQuestionAnswerDto[];

  @ApiHideProperty()
  @IsEmpty()
  createdUserId: number;
}
