import { Module } from '@nestjs/common';
import { ClassInfoService } from './class-info.service';
import { ClassInfoController } from './class-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassInfo } from './entities/class-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassInfo])],
  controllers: [ClassInfoController],
  providers: [ClassInfoService],
  exports: [ClassInfoService],
})
export class ClassInfoModule {}
