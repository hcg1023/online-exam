import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Password } from './password.entity';
import { IdentityEnum } from '@online-exam/contants';
import { ClassInfo } from '../../class-info/entities/class-info.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(() => Password)
  @JoinColumn()
  password: Password;

  @Column({
    type: 'enum',
    enum: [IdentityEnum.ADMIN, IdentityEnum.TEACHER, IdentityEnum.STUDENT],
    default: IdentityEnum.STUDENT,
  })
  identity: IdentityEnum;

  @ManyToOne(() => ClassInfo, (classInfo) => classInfo.students)
  classInfo: ClassInfo;

  @ManyToOne(() => User)
  createdUser: User;
}
