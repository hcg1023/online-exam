import { IdentityEnum } from '@online-exam/contants';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    enum: [IdentityEnum.ADMIN, IdentityEnum.TEACHER, IdentityEnum.STUDENT],
  })
  @IsNotEmpty()
  identity: IdentityEnum;
}
