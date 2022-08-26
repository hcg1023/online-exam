import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionAnswer } from './entities/question.answer';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, QuestionAnswer])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
