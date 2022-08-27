import { CreateUserDto } from './create-user.dto';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'createdUser',
  'password',
]) {
  @IsNotEmpty()
  id: number;
}
