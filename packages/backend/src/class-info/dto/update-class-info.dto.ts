import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateClassInfoDto } from './create-class-info.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassInfoDto extends PartialType(
  OmitType(CreateClassInfoDto, ['createdUser']),
) {
  @IsNotEmpty()
  @IsString()
  id: string;
}
