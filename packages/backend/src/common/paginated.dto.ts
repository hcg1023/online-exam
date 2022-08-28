import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginatedDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  pageNo: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  pageSize: number;
}

export function getRepositoryPaginationParams(paginated: PaginatedDto) {
  return {
    // limit 数量
    take: paginated.pageSize,
    // 偏移量
    skip: paginated.pageSize * (paginated.pageNo - 1),
  };
}
