import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Grade } from '../../grade/entities/grade.entity';
import { TestPaper } from '../../test-paper/entities/test-paper.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // 年级
  @ManyToOne(() => Grade)
  grade: Grade;

  // 试卷
  @ManyToMany(() => TestPaper)
  @JoinTable()
  testPapers: TestPaper[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
