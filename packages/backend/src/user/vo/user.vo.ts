import { OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserVo extends OmitType(UpdateUserDto, ['password']) {}
