import { PaginatedDto } from '../../common/paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class ListTaskDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  grade?: string;
}
