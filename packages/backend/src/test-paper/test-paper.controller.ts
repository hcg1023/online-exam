import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';

@ApiBearerAuth()
@ApiTags('TestPaper')
@ApiExcludeController()
@Controller('test-paper')
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @Post('create')
  create(
    @Body() createTestPaperDto: CreateTestPaperDto,
    @RequestUser() user: UserVO,
  ) {
    createTestPaperDto.createdUser = user.id;
    return this.testPaperService.create(createTestPaperDto);
  }

  @Get('list')
  findAll() {
    return this.testPaperService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPaperService.findOne(id);
  }

  @Post('update')
  update(@Body() updateTestPaperDto: UpdateTestPaperDto) {
    return this.testPaperService.update(updateTestPaperDto);
  }

  @Post('remove/:id')
  remove(@Param('id') id: string) {
    return this.testPaperService.remove(id);
  }
}
