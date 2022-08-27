import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  name: string;
}
