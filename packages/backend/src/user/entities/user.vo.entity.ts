import { Password } from './password.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  IdentityEnum,
  IdentityFormatterEnum,
  SexEnumFormatterEnum,
  UserStatusFormatterEnum,
} from '../../enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { ClassInfo } from '../../class-info/entities/class-info.entity';
import { GradeVO } from '../../grade/entities/grade.vo.entity';

export class UserVO {
  id: string;

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

  grade: GradeVO;

  classInfo: ClassInfo;

  constructor(props) {
    Object.assign(this, props);
  }
}
