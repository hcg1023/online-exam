import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../question/entities/question.entity';

@Entity()
export class QuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 单选，多选，判断的选项
  @Column({
    type: 'json',
  })
  options: string[];

  // 填空题和简答题的答案
  @Column()
  answer: string;

  // 批改状态
  // 如果没有填空或者简答题，则一定是true，已批改
  // 有填空题或者简答题，则是false，等待教师批改完成改为true
  @Column()
  correctStatus: boolean;

  // 得分，如果是选择题和判断题，后端处理，如果是填空和简答，需要教师批改
  @Column()
  score: number;

  // 多个题目答案对应同一个题目
  @ManyToOne(() => Question)
  question: Question;

  // 题目答案对应的答案组
  @ManyToOne(() => Answer, (answer) => answer.questionAnswers, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  answerGroup: Answer;

  // 创建用户
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
