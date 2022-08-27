import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Password } from './entities/password.entity';
import { GradeModule } from '../grade/grade.module';
import { ClassInfoModule } from '../class-info/class-info.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Password]),
    GradeModule,
    ClassInfoModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
