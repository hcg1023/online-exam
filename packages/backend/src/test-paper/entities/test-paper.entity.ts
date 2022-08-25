import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JoinTable } from 'typeorm/browser';
import { QuestionGroup } from './question-group.entity';
import { User } from '../../user/entities/user.entity';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class TestPaper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // 允许多个试卷对应多个班级
  @ManyToMany(() => ClassInfo, (classInfo) => classInfo.testPapers)
  classInfos: ClassInfo[];

  // 允许多个试卷对应一个学科
  @ManyToOne(() => Subject)
  subject: Subject;

  // 允许一个试卷对应多个题组
  @OneToMany(() => QuestionGroup, (group: QuestionGroup) => group.testPaper)
  @JoinTable()
  questionGroups: QuestionGroup[];

  // 允许多个试卷对应一个创建人
  @ManyToOne(() => User)
  createdUser: User;
}
