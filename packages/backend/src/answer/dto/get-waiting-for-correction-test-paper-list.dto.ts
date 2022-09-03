import { PaginatedDto } from '../../common/paginated.dto';
import { IsOptional, IsString } from 'class-validator';

export class GetWaitingForCorrectionTestPaperListDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  grade?: string;

  @IsString()
  @IsOptional()
  subject?: string;

  @IsString()
  @IsOptional()
  classInfo?: string;
}
