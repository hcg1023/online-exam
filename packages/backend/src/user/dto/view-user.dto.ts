import { OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from './update-user.dto';

export class ViewUserDto extends OmitType(UpdateUserDto, ['password']) {}
