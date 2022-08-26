import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/entities/question.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Grade, (grade) => grade.subjects)
  grades: Grade[];

  // 允许一个学科对应多个题目
  @OneToMany(() => Question, (question) => question.subject)
  questions: Question[];
}
