import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Password } from './password.entity';
import {
  IdentityEnum,
  IdentityFormatterEnum,
  SexEnumFormatterEnum,
  UserStatusEnum,
  UserStatusFormatterEnum,
} from '../../enums';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { Grade } from '../../grade/entities/grade.entity';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToOne(() => Password)
  @JoinColumn()
  @Exclude()
  @ApiHideProperty()
  @Type(() => Password)
  password: Password;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  sex: string;

  @Expose()
  get sexName() {
    return SexEnumFormatterEnum[this.sex] || '';
  }

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.ENABLE,
  })
  status: string;

  @Expose()
  get useStatusName() {
    return UserStatusFormatterEnum[this.status] || '';
  }

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: IdentityEnum,
    default: IdentityEnum.STUDENT,
  })
  identity: IdentityEnum;

  @Expose()
  get identityName() {
    return IdentityFormatterEnum[this.identity] || '';
  }

  // 多个学生对应一个年级
  @ManyToOne(() => Grade)
  @Type(() => Grade)
  grade: Grade;

  // 多个学生对应一个班级
  @ManyToOne(() => ClassInfo, (classInfo) => classInfo.students)
  @Type(() => ClassInfo)
  classInfo: ClassInfo;

  @ManyToOne(() => User)
  @Type(() => User)
  createdUser: User;

  @CreateDateColumn()
  createdDate: Date;
}
