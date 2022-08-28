import { IsOptional, IsString } from 'class-validator';
import { PaginatedDto } from '../../common/paginated.dto';

export class UserListDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  username?: string;
}
