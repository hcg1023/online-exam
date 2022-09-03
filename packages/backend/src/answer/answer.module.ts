import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionAnswer } from './entities/question.answer.entity';
import { TaskModule } from '../task/task.module';
import { TestPaperModule } from '../test-paper/test-paper.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, QuestionAnswer]),
    TaskModule,
    TestPaperModule,
    UserModule,
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
