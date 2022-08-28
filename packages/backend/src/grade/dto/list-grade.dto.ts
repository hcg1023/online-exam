import { PaginatedDto } from '../../common/paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class ListGradeDto extends PaginatedDto {
  @IsOptional()
  @IsString()
  title?: string;
}
