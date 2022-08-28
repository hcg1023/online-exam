import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { QuestionTypeEnum } from '../../enums';
import { Type } from 'class-transformer';
import { QuestionOption } from '../entities/question-option.entity';

export class QuestionOptionDto implements QuestionOption {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  value: string;
}

function judgeOptionsIsRequired(obj: CreateQuestionDto) {
  return [
    QuestionTypeEnum.SINGLE_CHOICE,
    QuestionTypeEnum.MULTIPLE_CHOICE,
    QuestionTypeEnum.JUDGE_QUESTION,
  ].includes(obj.type);
}

function judgeAnsweIsRequired(obj: CreateQuestionDto) {
  return [
    QuestionTypeEnum.REPLY_QUESTION,
    QuestionTypeEnum.SHORT_ANSWER,
  ].includes(obj.type);
}

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(QuestionTypeEnum)
  @IsNotEmpty()
  type: QuestionTypeEnum;

  @IsInt()
  @Min(1)
  score: number;

  @IsInt()
  @Min(1)
  @Max(5)
  difficulty: number;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @ValidateIf(judgeOptionsIsRequired)
  @IsArray()
  @IsNotEmpty()
  @Type(() => QuestionOptionDto)
  @MinLength(2)
  options?: QuestionOptionDto[];

  @ValidateIf(judgeOptionsIsRequired)
  @IsArray()
  @MinLength(1)
  correctOptions?: string[];

  @ValidateIf(judgeAnsweIsRequired)
  @IsString()
  @IsNotEmpty()
  answer?: string;

  @IsString()
  @IsOptional()
  analyze?: string;
}
