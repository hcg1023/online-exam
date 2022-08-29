import { PaginatedDto } from '../../common/paginated.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ListTestPaperDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  createdUser?: number;
}
