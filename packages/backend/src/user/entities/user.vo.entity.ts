import { Password } from './password.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  IdentityEnum,
  IdentityFormatterEnum,
  SexEnumFormatterEnum,
  UserStatusFormatterEnum,
} from '../../enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { GradeBaseVO } from '../../grade/entities/grade.vo.entity';
import { ClassInfoBaseVO } from '../../class-info/entities/class-info.vo.entity';

export class UserVO {
  id: number;

  username: string;

  @ApiHideProperty()
  @Exclude()
  password: Password;

  name: string;

  age: number;

  sex: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  get sexName() {
    return SexEnumFormatterEnum[this.sex] || '';
  }

  status: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  get useStatusName() {
    return UserStatusFormatterEnum[this.status] || '';
  }

  email: string;

  identity: IdentityEnum;

  @ApiProperty({ type: 'string' })
  @Expose()
  get identityName() {
    return IdentityFormatterEnum[this.identity] || '';
  }

  createdDate: Date;

  grade: GradeBaseVO;

  classInfo: ClassInfoBaseVO;

  constructor(props) {
    Object.assign(this, props);
  }
}
