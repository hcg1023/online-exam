import { IdentityEnum } from '@online-exam/contants';

export class CreateUserDto {
  username: string;
  password: string;
  identity: IdentityEnum;
}
