import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ListQuestionDto } from './dto/list-question.dto';

@ApiBearerAuth()
@ApiTags('Question 试题')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get('list')
  findAll(@Query() query: ListQuestionDto) {
    return this.questionService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.questionService.findOne(id);
  }

  @Post('update')
  update(@Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(updateQuestionDto);
  }

  @Post('remove/:id')
  remove(@Param('id') id: number) {
    return this.questionService.remove(id);
  }
}
