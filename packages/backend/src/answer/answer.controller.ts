import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetWaitingForCorrectionTestPaperListDto } from './dto/get-waiting-for-correction-test-paper-list.dto';
import { JudgeAnswerDto } from './dto/judge-answer.dto';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';
import { PaginatedVO } from '../common/paginated.vo.entity';
import { TeacherTestPaperVO } from './entities/teacher-test-paper.vo.entity';

@ApiBearerAuth()
@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('/judgeList')
  async findWaitingForCorrectionTestPaperList(
    @Query() query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    const [results, total] =
      await this.answerService.findWaitingForCorrectionTestPaperList(query);
    return new PaginatedVO<TeacherTestPaperVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      total,
      results,
    });
  }

  @Get('/completeList')
  async findCorrectedTestPaperList(
    @Query() query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    const [results, total] =
      await this.answerService.findCorrectedTestPaperList(query);
    return new PaginatedVO<TeacherTestPaperVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      total,
      results,
    });
  }

  @Get('/:taskId/:testPaperId/:userId')
  getTestPaperAndAnswer(
    @Param('taskId') taskId: string,
    @Param('testPaperId') testPaperId: string,
    @Param('userId') userId: number,
  ) {
    return this.answerService.getTestPaperAndAnswer(
      taskId,
      testPaperId,
      userId,
    );
  }

  @Post('/judge')
  handleJudgeAnswer(
    @Body() judgeAnswerDto: JudgeAnswerDto,
    @RequestUser() user: UserVO,
  ) {
    judgeAnswerDto.createdUser = user.id;
    return this.answerService.handleJudgeAnswer(judgeAnswerDto);
  }
}
