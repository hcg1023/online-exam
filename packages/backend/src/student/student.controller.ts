import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';
import { StudentService } from './student.service';
import { QueryTaskListDto } from './dto/query-task-list.dto';
import { PaginatedVO } from '../common/paginated.vo.entity';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { StudentTaskVO } from './entities/student-task.vo.entity';
import { QueryTaskTestPaperVO } from './entities/query-task-test-paper.vo.entity';
import { TestPaperAndAnswerVO } from './entities/test-paper-and-answer.vo.entity';

@ApiBearerAuth()
@ApiTags('Exam 考试学生端')
@Controller('exam')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Roles(IdentityEnum.STUDENT)
  @ApiPaginatedResponse(StudentTaskVO)
  @Get('/tasks')
  async getStudentTaskList(
    @Query() query: QueryTaskListDto,
    @RequestUser() user: UserVO,
  ) {
    const [results, total] = await this.studentService.getStudentTaskList(
      query,
      user,
    );
    return new PaginatedVO({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      results,
      total,
    });
  }

  @Get('/:taskId/:testPaperId')
  @ApiBaseResponse(QueryTaskTestPaperVO)
  async getTestPaperInfo(
    @Param('taskId') taskId: string,
    @Param('testPaperId') testPaperId: string,
  ) {
    return this.studentService.getTestPaperInfo(taskId, testPaperId);
  }

  @Post('/submit')
  @ApiBooleanResponse()
  async submitExamAnswer(
    @Body() submitExamAnswerDto: CreateAnswerDto,
    @RequestUser() user: UserVO,
  ) {
    // 提交试卷答案
    submitExamAnswerDto.createdUserId = user.id;
    return this.studentService.submitTestPaperAnswer(submitExamAnswerDto);
  }

  @Get('/answer/:taskId/:testPaperId')
  @ApiBaseResponse(TestPaperAndAnswerVO)
  async getTestPaperAndAnswer(
    @Param('taskId') taskId: string,
    @Param('testPaperId') testPaperId: string,
    @RequestUser() user: UserVO,
  ) {
    return this.studentService.getTestPaperAndAnswer(
      taskId,
      testPaperId,
      user.id,
    );
  }
}
