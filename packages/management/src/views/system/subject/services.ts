/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-27 19:57:10
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新班级管理
export const updateDisciplineList = (data?: object) => {
  return http.request<Result>("post", `/subject/update`, { data });
};

// 添加班级管理
export const addDisciplineList = (data?: object) => {
  return http.request<Result>("post", `/subject/create`, { data });
};

// 添加班级管理
export const findDisciplineDetailed = (id?: string) => {
  return http.request<Result>("get", `/subject/${id}`);
};
