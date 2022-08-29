import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionTypeEnum } from '../../enums';
import { QuestionGroup } from '../../test-paper/entities/question-group.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { Grade } from '../../grade/entities/grade.entity';
import { QuestionOption } from './question-option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: QuestionTypeEnum,
  })
  type: QuestionTypeEnum;

  // 题目
  @Column()
  title: string;

  // 允许多个题目对应多个题组
  @ManyToMany(() => QuestionGroup, (group: QuestionGroup) => group.questions)
  groups: QuestionGroup[];

  // 题目分数
  @Column()
  score: number;

  // 难度
  @Column()
  difficulty: number;

  // 多个题目对应一个年级
  @ManyToOne(() => Grade, (grade) => grade.questions)
  grade: Grade;

  // 允许多个题目对应一个学科
  @ManyToOne(() => Subject, (subject) => subject.questions)
  subject: Subject;

  // 单选，多选，判断的选项
  @Column({
    type: 'json',
  })
  options: QuestionOption[];

  // 单选，多选，判断的正确选项
  @Column({
    type: 'json',
  })
  correctOptions: string[];

  // 填空题和简答题的答案
  @Column({
    default: '',
  })
  answer: string;

  // 题目解析
  @Column({
    default: '',
  })
  analyze: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
