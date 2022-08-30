import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListQuestionDto } from './dto/list-question.dto';
import { PaginatedVO } from '../common/paginated.vo.entity';
import { QuestionVO } from './entities/question.vo.entity';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';

@ApiBearerAuth()
@Roles(IdentityEnum.ADMIN, IdentityEnum.TEACHER)
@ApiTags('Question 试题')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiBaseResponse(QuestionVO)
  @Post('create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @ApiPaginatedResponse(QuestionVO)
  @Get('list')
  async findAll(@Query() query: ListQuestionDto) {
    const [results, total] = await this.questionService.findAll(query);
    return new PaginatedVO<QuestionVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      total,
      results,
    });
  }

  @ApiBaseResponse(QuestionVO)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(id);
  }

  @ApiBaseResponse(QuestionVO)
  @Post('update')
  update(@Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(updateQuestionDto);
  }

  @ApiBooleanResponse()
  @Post('remove/:id')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }
}
