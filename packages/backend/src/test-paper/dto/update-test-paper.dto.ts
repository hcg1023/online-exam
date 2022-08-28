import { PartialType } from '@nestjs/swagger';
import { CreateTestPaperDto, QuestionGroupDto } from './create-test-paper.dto';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateQuestionGroupDto extends QuestionGroupDto {
  @IsString()
  @IsOptional()
  id?: string;
}

export class UpdateTestPaperDto extends PartialType(CreateTestPaperDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsNotEmpty()
  @MinLength(1)
  questionGroups: UpdateQuestionGroupDto[];
}
