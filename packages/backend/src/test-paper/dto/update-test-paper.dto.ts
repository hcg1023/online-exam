import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTestPaperDto, QuestionGroupDto } from './create-test-paper.dto';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateQuestionGroupDto extends QuestionGroupDto {
  @IsString()
  @IsOptional()
  id?: string;
}

export class UpdateTestPaperDto extends PartialType(
  OmitType(CreateTestPaperDto, ['createdUser']),
) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  questionGroups: UpdateQuestionGroupDto[];
}
