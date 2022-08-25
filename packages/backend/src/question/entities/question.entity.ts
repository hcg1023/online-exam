import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionTypeEnum } from '@online-exam/contants';
import { QuestionGroup } from '../../test-paper/entities/question-group.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    enum: QuestionTypeEnum,
  })
  type: string;

  @Column()
  title: string;

  // 允许多个题目对应多个题组
  @ManyToMany(() => QuestionGroup, (group: QuestionGroup) => group.questions)
  groups: QuestionGroup[];

  @Column()
  score: number;

  // 允许多个题目对应一个学科
  @ManyToOne(() => Subject, (subject) => subject.questions)
  subject: Subject;
}
