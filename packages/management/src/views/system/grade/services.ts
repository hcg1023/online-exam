/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-27 19:57:22
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新班级管理
export const updateGradeList = (data?: object) => {
  return http.request<Result>("post", `/grade/update`, { data });
};

// 添加班级管理
export const addGradeList = (data?: object) => {
  return http.request<Result>("post", `/grade/create`, { data });
};

// 添加班级管理
export const findGradeDetailed = (id?: string) => {
  return http.request<Result>("get", `/grade/${id}`);
};
