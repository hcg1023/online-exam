import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // 允许一个学科对应多个题目
  @OneToMany(() => Question, (question) => question.subject)
  questions: Question[];
}
