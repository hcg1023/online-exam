import { SetMetadata } from '@nestjs/common';
import { IdentityEnum } from '@online-exam/contants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IdentityEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
