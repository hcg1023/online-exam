export enum IdentityEnum {
  ADMIN,
  TEACHER,
  STUDENT,
}

export const IdentityFormatterEnum = {
  [IdentityEnum.ADMIN]: '管理员',
  [IdentityEnum.TEACHER]: '教师',
  [IdentityEnum.STUDENT]: '学生',
};
