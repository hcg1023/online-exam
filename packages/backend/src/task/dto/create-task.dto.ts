import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  grade: string;

  @IsArray()
  @ArrayMinSize(1)
  testPapers: string[];
}
