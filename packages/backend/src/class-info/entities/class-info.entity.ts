import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestPaper } from '../../test-paper/entities/test-paper.entity';
import { User } from '../../user/entities/user.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // 年级
  @ManyToOne(() => Grade, (grade) => grade.classInfos)
  grade: Grade;

  // 允许多个班级对应多个试卷
  @ManyToMany(() => TestPaper, (testPaper) => testPaper.classInfos)
  testPapers: TestPaper[];

  // 允许一个班级对应多个学生
  @OneToMany(() => User, (user) => user.classInfo)
  students: User[];
}
