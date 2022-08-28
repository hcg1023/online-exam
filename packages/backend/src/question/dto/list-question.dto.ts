import { PaginatedDto } from '../../common/paginated.dto';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { QuestionTypeEnum } from '../../enums';
import { Type } from 'class-transformer';

export class ListQuestionDto extends PaginatedDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  gradeId?: string;

  @IsString()
  @IsOptional()
  subjectId?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsEnum(QuestionTypeEnum)
  @IsOptional()
  type?: QuestionTypeEnum;
}
