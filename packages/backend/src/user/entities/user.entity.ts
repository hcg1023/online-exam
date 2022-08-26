import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Password } from './password.entity';
import { IdentityEnum } from '@online-exam/contants';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { Grade } from '../../grade/entities/grade.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(() => Password)
  @JoinColumn()
  password: Password;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Column()
  status: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: [IdentityEnum.ADMIN, IdentityEnum.TEACHER, IdentityEnum.STUDENT],
    default: IdentityEnum.STUDENT,
  })
  identity: IdentityEnum;

  @ManyToOne(() => Grade)
  grade: Grade;

  @ManyToOne(() => ClassInfo, (classInfo) => classInfo.students)
  classInfo: ClassInfo;

  @ManyToOne(() => User)
  createdUser: User;
}
