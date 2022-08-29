import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SubjectBaseVO } from './entities/subject.vo.entity';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { ListSubjectDto } from './dto/list-subject.dto';
import { PaginatedVO } from '../common/paginated.vo.entity';

@ApiBearerAuth()
@ApiTags('Subject 学科')
@Controller('subject')
@Roles(IdentityEnum.ADMIN)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('create')
  @ApiBaseResponse(SubjectBaseVO)
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get('list')
  @ApiPaginatedResponse(SubjectBaseVO)
  async findAll(@Query() query: ListSubjectDto) {
    const [results, total] = await this.subjectService.findAll(query);
    return new PaginatedVO<SubjectBaseVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      results,
      total,
    });
  }

  @Get(':id')
  @ApiBaseResponse(SubjectBaseVO)
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @Post('update')
  @ApiBaseResponse(SubjectBaseVO)
  update(@Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(updateSubjectDto);
  }

  @Post('remove/:id')
  @ApiBooleanResponse()
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
