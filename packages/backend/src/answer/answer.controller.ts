import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiBearerAuth, ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { GetWaitingForCorrectionTestPaperListDto } from './dto/get-waiting-for-correction-test-paper-list.dto';
import { JudgeAnswerDto } from './dto/judge-answer.dto';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';

@ApiBearerAuth()
@ApiTags('Answer')
@ApiExcludeController()
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get('/answer/judgeList')
  findWaitingForCorrectionTestPaperList(
    @Query() query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    return this.answerService.findWaitingForCorrectionTestPaperList(query);
  }

  @Get('/answer/completeList')
  findCorrectedTestPaperList(
    @Query() query: GetWaitingForCorrectionTestPaperListDto,
  ) {
    return this.answerService.findCorrectedTestPaperList(query);
  }

  @Get('/:taskId/testPaperId/:userId')
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
