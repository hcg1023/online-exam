import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { Subject } from '../../subject/entities/subject.entity';

// 年级
@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  // 科目
  @ManyToMany(() => Subject, (subject) => subject.grades, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  subjects: Subject[];

  // 班级
  @OneToMany(() => ClassInfo, (classInfo) => classInfo.grade)
  classInfos: ClassInfo[];
}
