import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  title: string;

  @IsArray()
  @IsOptional()
  subjects?: string[];
}
