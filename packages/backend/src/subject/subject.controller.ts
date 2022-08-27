import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Subject')
@Controller('subject')
@Roles(IdentityEnum.ADMIN)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post('add')
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @Post('update')
  update(@Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(updateSubjectDto);
  }

  @Post('remove/:id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
