import { PartialType } from '@nestjs/swagger';
import { CreateClassInfoDto } from './create-class-info.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassInfoDto extends PartialType(CreateClassInfoDto) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
