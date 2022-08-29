import { PaginatedDto } from '../../common/paginated.dto';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatusEnum } from '../../enums/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ListTaskDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  grade?: string;

  @ApiProperty({
    description: '开始日期时间戳，与结束日期结合为期间内查询',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  startDate?: number;

  @ApiProperty({
    description: '结束日期时间戳，与开始日期结合为期间内查询',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  endDate?: number;
}
