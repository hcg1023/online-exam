/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 17:21:59
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 获取学生列表
export const getStudentsList = (params?: object) => {
  return http.request<Result>("get", "/user/student/list", { params });
};
// 根据年级查询班级列表
export const getClassInfo = (params?: object) => {
  return http.request<Result>("get", "/grade/classInfos", { params });
};
