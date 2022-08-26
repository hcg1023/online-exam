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

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToMany(() => Subject, (subject) => subject.grades)
  @JoinTable()
  subjects: Subject[];

  @OneToMany(() => ClassInfo, (classInfo) => classInfo.grade)
  classInfos: ClassInfo[];
}
