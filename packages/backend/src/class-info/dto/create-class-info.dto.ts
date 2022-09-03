import { IsEmpty, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateClassInfoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10)
  name: string;

  @IsNotEmpty()
  @IsString()
  grade: string;

  @ApiHideProperty()
  @IsEmpty()
  createdUser: number;
}
