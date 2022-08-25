import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';

@Controller('test-paper')
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post()
  create(@Body() createTestPaperDto: CreateTestPaperDto) {
    return this.testPaperService.create(createTestPaperDto);
  }

  @Get()
  findAll() {
    return this.testPaperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPaperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestPaperDto: UpdateTestPaperDto) {
    return this.testPaperService.update(+id, updateTestPaperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testPaperService.remove(+id);
  }
}
