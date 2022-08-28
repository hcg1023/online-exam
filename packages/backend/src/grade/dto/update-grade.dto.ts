import { PartialType } from '@nestjs/swagger';
import { CreateGradeDto } from './create-grade.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGradeDto extends PartialType(CreateGradeDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
