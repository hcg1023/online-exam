import { PaginatedDto } from '../../common/paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class ListSubjectDto extends PaginatedDto {
  @IsOptional()
  @IsString()
  name?: string;
}
