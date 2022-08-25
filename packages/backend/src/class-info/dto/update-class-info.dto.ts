import { PartialType } from '@nestjs/swagger';
import { CreateClassInfoDto } from './create-class-info.dto';

export class UpdateClassInfoDto extends PartialType(CreateClassInfoDto) {}
