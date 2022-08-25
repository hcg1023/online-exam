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
import { SujectModule } from './subject/suject.module';
import { SubjectModule } from './subject/subject.module';

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
    }),
    UserModule,
    AuthModule,
    RoleModule,
    TestPaperModule,
    QuestionModule,
    ClassInfoModule,
    SujectModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
