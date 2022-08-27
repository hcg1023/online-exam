import { SetMetadata } from '@nestjs/common';
import { IdentityEnum } from '../enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IdentityEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
