import { Module } from '@nestjs/common';
import { ClassInfoService } from './class-info.service';
import { ClassInfoController } from './class-info.controller';

@Module({
  controllers: [ClassInfoController],
  providers: [ClassInfoService]
})
export class ClassInfoModule {}
