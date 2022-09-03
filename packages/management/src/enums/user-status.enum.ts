export enum UserStatusEnum {
  ENABLE = 'ENABLE',
  DISABLED = 'DISABLED',
}

export const UserStatusFormatterEnum = {
  [UserStatusEnum.ENABLE]: '启用',
  [UserStatusEnum.DISABLED]: '禁用',
};
