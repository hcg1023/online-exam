import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { TestPaper } from './test-paper.entity';

@Entity()
export class QuestionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 允许多个题组对应一个试卷
  @ManyToOne(() => TestPaper, (testPaper) => testPaper.questionGroups)
  testPaper: TestPaper;

  // 允许多个题目对应多个题组
  @ManyToMany(() => Question, (question: Question) => question.groups)
  @JoinTable()
  questions: Question[];
}
