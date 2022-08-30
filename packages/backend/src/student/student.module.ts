import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TestPaperModule } from '../test-paper/test-paper.module';
import { GradeModule } from '../grade/grade.module';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { StudentController } from './student.controller';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [TestPaperModule, GradeModule, UserModule, TaskModule, AnswerModule],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
