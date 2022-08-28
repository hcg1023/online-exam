import { IdentityEnum, SexEnum, UserStatusEnum } from '../../enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';

function validateIsStudent(obj: CreateUserDto) {
  return obj.identity === IdentityEnum.STUDENT;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  password: string;

  @ApiProperty({
    enum: [IdentityEnum.ADMIN, IdentityEnum.TEACHER, IdentityEnum.STUDENT],
  })
  @IsNotEmpty()
  @IsEnum(IdentityEnum)
  identity: IdentityEnum;

  @IsString()
  name?: string;

  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @Min(0)
  @Max(100)
  age?: number;

  @IsEnum(SexEnum)
  sex?: SexEnum;

  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @ValidateIf(validateIsStudent)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf(validateIsStudent)
  @IsNotEmpty()
  @IsString()
  grade: string;

  @ValidateIf(validateIsStudent)
  @IsNotEmpty()
  @IsString()
  classInfo: string;

  @IsEmpty()
  @ApiHideProperty()
  createdUser: number;
}
