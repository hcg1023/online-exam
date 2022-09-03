/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-09-03 17:49:25
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 获取试卷列表
export const getTestPaperList = (params?: object) => {
  return http.request<Result>("get", "/question/list", { params });
};
