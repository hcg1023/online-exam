import { Module } from '@nestjs/common';
import { TestPaperService } from './test-paper.service';
import { TestPaperController } from './test-paper.controller';

@Module({
  controllers: [TestPaperController],
  providers: [TestPaperService]
})
export class TestPaperModule {}
