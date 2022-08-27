import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassInfoService } from './class-info.service';
import { CreateClassInfoDto } from './dto/create-class-info.dto';
import { UpdateClassInfoDto } from './dto/update-class-info.dto';

@Controller('class-info')
export class ClassInfoController {
  constructor(private readonly classInfoService: ClassInfoService) {}

  @Post()
  create(@Body() createClassInfoDto: CreateClassInfoDto) {
    return this.classInfoService.create(createClassInfoDto);
  }

  @Get()
  findAll() {
    return this.classInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classInfoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClassInfoDto: UpdateClassInfoDto,
  ) {
    return this.classInfoService.update(+id, updateClassInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classInfoService.remove(+id);
  }
}
