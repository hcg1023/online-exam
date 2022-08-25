import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestPaper } from '../../test-paper/entities/test-paper.entity';
import { User } from '../../user/entities/user.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // 允许多个班级对应多个学科
  @ManyToMany(() => Subject)
  @JoinTable()
  subjects: Subject[];

  // 允许多个班级对应多个试卷
  @ManyToMany(() => TestPaper, (testPaper) => testPaper.classInfos)
  testPapers: TestPaper[];

  // 允许一个班级对应多个学生
  @OneToMany(() => User, (user) => user.classInfo)
  students: User[];
}
