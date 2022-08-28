import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TestPaperModule } from '../test-paper/test-paper.module';
import { GradeModule } from '../grade/grade.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), TestPaperModule, GradeModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
