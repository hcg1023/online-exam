/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 17:22:05
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 获取教师列表
export const getTeachersList = (params?: object) => {
  return http.request<Result>("get", "/user/teacher/list", { params });
};
