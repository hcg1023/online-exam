export enum TaskStatusEnum {
  UNDONE = 'UNDONE',
  DONE = 'DONE',
  CORRECT = 'CORRECT',
}

export const TaskStatusFormatterEnum = {
  [TaskStatusEnum.UNDONE]: '未完成',
  [TaskStatusEnum.DONE]: '完成',
  [TaskStatusEnum.CORRECT]: '待批改',
};
