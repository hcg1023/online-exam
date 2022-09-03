import { Module } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { TestPaperController } from './test-paper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPaper } from './entities/test-paper.entity';
import { QuestionGroup } from './entities/question-group.entity';
import { GradeModule } from '../grade/grade.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestPaper, QuestionGroup]),
    GradeModule,
    SubjectModule,
  ],
  controllers: [TestPaperController],
  providers: [TestPaperService],
  exports: [TestPaperService],
})
export class TestPaperModule {}
