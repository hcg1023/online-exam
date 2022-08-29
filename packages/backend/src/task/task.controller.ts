import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { ListTaskDto } from './dto/list-task.dto';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { TaskVO } from './entities/task.vo.entity';
import { PaginatedVO } from '../common/paginated.vo.entity';

@ApiBearerAuth()
@ApiTags('Task 考试')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @ApiBaseResponse(TaskVO)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get('list')
  @ApiPaginatedResponse(TaskVO)
  async findAll(@Query() query: ListTaskDto) {
    const [results, total] = await this.taskService.findAll(query);
    return new PaginatedVO<TaskVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      results,
      total,
    });
  }

  @Get(':id')
  @ApiBaseResponse(TaskVO)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post('update')
  @ApiBaseResponse(TaskVO)
  update(@Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(updateTaskDto);
  }

  @Post('remove/:id')
  @ApiBooleanResponse()
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
