import { Module } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { TestPaperController } from './test-paper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestPaper } from './entities/test-paper.entity';
import { QuestionGroup } from './entities/question-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestPaper, QuestionGroup])],
  controllers: [TestPaperController],
  providers: [TestPaperService],
})
export class TestPaperModule {}
