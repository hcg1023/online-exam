import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { GradeVO } from './entities/grade.vo.entity';
import { ListGradeDto } from './dto/list-grade.dto';
import { SubjectBaseVO } from '../subject/entities/subject.vo.entity';

@ApiBearerAuth()
@ApiTags('Grade 年级')
@Roles(IdentityEnum.ADMIN)
@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post('create')
  @ApiBaseResponse(GradeVO)
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get('list')
  @ApiPaginatedResponse(GradeVO)
  findAll(@Query() query: ListGradeDto) {
    return this.gradeService.findAll(query);
  }

  @Get('subjects')
  @ApiPaginatedResponse(SubjectBaseVO)
  getGradeSubjects(@Query() query: { id: string }) {
    return this.gradeService.getGradeSubjects(query.id);
  }

  @Get(':id')
  @ApiBaseResponse(GradeVO)
  findOne(@Param('id') id: string) {
    return this.gradeService.findOne(id);
  }

  @Post('update')
  @ApiBaseResponse(GradeVO)
  update(@Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.update(updateGradeDto);
  }

  @Post('remove/:id')
  @ApiBooleanResponse()
  remove(@Param('id') id: string) {
    return this.gradeService.remove(id);
  }
}
