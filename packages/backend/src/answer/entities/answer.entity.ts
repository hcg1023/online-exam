import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { TestPaper } from '../../test-paper/entities/test-paper.entity';
import { Task } from '../../task/entities/task.entity';
import { QuestionAnswer } from './question.answer.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 耗时
  @Column({
    default: 0,
  })
  duration: number;

  // 批改状态
  // 如果没有填空或者简答题，则一定是true，已批改
  // 有填空题或者简答题，则是false，等待教师批改完成改为true
  @Column({
    default: false,
  })
  correctStatus: boolean;

  // 考试，多个用户的答案可以对应一次考试
  @ManyToOne(() => Task)
  task: Task;

  // 试卷，多个答案可以对应同一个试卷
  @ManyToOne(() => TestPaper, (testPaper) => testPaper.answers)
  testPaper: TestPaper;

  // 题目答案
  @OneToMany(
    () => QuestionAnswer,
    (questionAnswer) => questionAnswer.answerGroup,
  )
  @JoinTable()
  questionAnswers: QuestionAnswer[];

  // 作答的学生
  @ManyToOne(() => User)
  createdUser: User;

  // 批改教师
  @ManyToOne(() => User)
  correctTeacher: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
