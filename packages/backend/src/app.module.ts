import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { TestPaperModule } from './test-paper/test-paper.module';
import { QuestionModule } from './question/question.module';
import { ClassInfoModule } from './class-info/class-info.module';
import { SubjectModule } from './subject/subject.module';
import { GradeModule } from './grade/grade.module';
import { AnswerModule } from './answer/answer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'chenguang',
      password: '123456',
      database: 'online_exam',
      autoLoadEntities: true,
      synchronize: true,
      timezone: '+08:00',
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    RoleModule,
    TestPaperModule,
    QuestionModule,
    ClassInfoModule,
    SubjectModule,
    GradeModule,
    AnswerModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [StudentModule],
})
export class AppModule {}
