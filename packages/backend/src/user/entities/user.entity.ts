import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Password } from './password.entity';
import { IdentityEnum } from '@online-exam/contants';

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
}
