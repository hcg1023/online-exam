import {
  ArrayMinSize,
  IsArray,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';
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
  @ArrayMinSize(1)
  questions: number[];
}

export class CreateTestPaperDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  questionGroups: QuestionGroupDto[];

  @IsInt()
  @IsNotEmpty()
  minute: number;

  @IsEmpty()
  @ApiHideProperty()
  createdUser: number;
}
