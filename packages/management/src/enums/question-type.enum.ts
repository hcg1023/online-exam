export enum QuestionTypeEnum {
  /*
   * 单选题
   * */
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  /*
   * 多选题
   * */
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  /*
   * 填空题
   * */
  REPLY_QUESTION = 'REPLY_QUESTION',
  /*
   * 判断题
   * */
  JUDGE_QUESTION = 'JUDGE_QUESTION',
  /*
   * 简答题
   * */
  SHORT_ANSWER = 'SHORT_ANSWER',
}

export const QuestionTypeFormatterEnum = {
  [QuestionTypeEnum.SINGLE_CHOICE]: '单选题',
  [QuestionTypeEnum.MULTIPLE_CHOICE]: '多选题',
  [QuestionTypeEnum.REPLY_QUESTION]: '填空题',
  [QuestionTypeEnum.JUDGE_QUESTION]: '判断题',
  [QuestionTypeEnum.SHORT_ANSWER]: '简答题',
};
