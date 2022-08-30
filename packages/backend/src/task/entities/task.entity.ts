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

  // 开始日期
  @Column({
    type: 'date',
    transformer: {
      // 写入
      to(value: number): Date {
        return new Date(value);
      },
      from(value: string): Date {
        return new Date(value);
      },
    },
  })
  startDate: Date;

  // 结束日期
  @Column({
    type: 'date',
    transformer: {
      // 写入
      to(value: number): Date {
        return new Date(value);
      },
      from(value: Date): Date {
        return new Date(value);
      },
    },
  })
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
