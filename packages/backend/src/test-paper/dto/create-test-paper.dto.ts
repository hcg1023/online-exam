import {
  IsArray,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class QuestionGroupDto {
  @IsInt()
  @IsNotEmpty()
  order: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsNotEmpty()
  @MinLength(1)
  questions: string[];
}

export class CreateTestPaperDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsArray()
  @IsNotEmpty()
  @MinLength(1)
  questionGroups: QuestionGroupDto[];

  @IsInt()
  @IsNotEmpty()
  minute: number;

  @IsEmpty()
  @ApiHideProperty()
  createdUser: number;
}
