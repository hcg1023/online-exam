import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Entity()
export class ClassInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: '',
  })
  name: string;

  // 年级
  @ManyToOne(() => Grade, (grade) => grade.classInfos, {
    cascade: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  grade: Grade;

  // 允许一个班级对应多个学生
  @OneToMany(() => User, (user) => user.classInfo)
  students: User[];

  @ManyToOne(() => User)
  createdUser: User;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
