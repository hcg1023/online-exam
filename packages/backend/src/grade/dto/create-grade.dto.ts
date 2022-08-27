import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGradeDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  title: string;

  @IsArray()
  subjects: string[];

  @IsArray()
  classInfos: string[];
}
