import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClassInfoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  name: string;

  @IsNotEmpty()
  @IsString()
  grade: string;
}
