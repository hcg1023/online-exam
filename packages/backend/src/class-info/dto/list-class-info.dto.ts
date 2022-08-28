import { IsOptional, IsString } from 'class-validator';
import { PaginatedDto } from '../../common/paginated.dto';

export class ListClassInfoDto extends PaginatedDto {
  @IsOptional()
  @IsString()
  name?: string;
}
