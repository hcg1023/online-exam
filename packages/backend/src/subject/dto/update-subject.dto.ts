import { CreateSubjectDto } from './create-subject.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateSubjectDto extends CreateSubjectDto {
  @IsNotEmpty()
  id: string;
}
