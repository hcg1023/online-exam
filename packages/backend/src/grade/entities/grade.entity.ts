import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { Question } from '../../question/entities/question.entity';

// 年级
@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  // 科目
  @ManyToMany(() => Subject, (subject) => subject.grades)
  @JoinTable()
  subjects: Subject[];

  // 班级
  @OneToMany(() => ClassInfo, (classInfo) => classInfo.grade)
  classInfos: ClassInfo[];

  @OneToMany(() => Question, (question) => question.grade)
  questions: Question[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
