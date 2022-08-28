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
import { Question } from '../../question/entities/question.entity';
import { TestPaper } from './test-paper.entity';

@Entity()
export class QuestionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 1,
  })
  order: number;

  @Column()
  title: string;

  // 允许多个题组对应一个试卷
  @ManyToOne(() => TestPaper, (testPaper) => testPaper.questionGroups, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  testPaper: TestPaper;

  // 允许多个题目对应多个题组
  @ManyToMany(() => Question, (question: Question) => question.groups)
  @JoinTable()
  questions: Question[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
