import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { CreateTestPaperDto } from './dto/create-test-paper.dto';
import { UpdateTestPaperDto } from './dto/update-test-paper.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';
import { ListTestPaperDto } from './dto/list-test-paper.dto';
import { TestPaperVO } from './entities/test-paper.vo.entity';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { PaginatedVO } from '../common/paginated.vo.entity';

@ApiBearerAuth()
@ApiTags('TestPaper 试卷')
@Controller('test-paper')
export class TestPaperController {
  constructor(private readonly testPaperService: TestPaperService) {}

  @ApiBaseResponse(TestPaperVO)
  @Post('create')
  create(
    @Body() createTestPaperDto: CreateTestPaperDto,
    @RequestUser() user: UserVO,
  ) {
    createTestPaperDto.createdUser = user.id;
    return this.testPaperService.create(createTestPaperDto);
  }

  @ApiPaginatedResponse(TestPaperVO)
  @Get('list')
  async findAll(@Query() query: ListTestPaperDto) {
    const [results, total] = await this.testPaperService.findAll(query);
    return new PaginatedVO<TestPaperVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      results,
      total,
    });
  }

  @ApiBaseResponse(TestPaperVO)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testPaperService.findOne(id);
  }

  @ApiBaseResponse(TestPaperVO)
  @Post('update')
  update(@Body() updateTestPaperDto: UpdateTestPaperDto) {
    return this.testPaperService.update(updateTestPaperDto);
  }

  @ApiBooleanResponse()
  @Post('remove/:id')
  remove(@Param('id') id: string) {
    return this.testPaperService.remove(id);
  }
}
