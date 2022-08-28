/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-27 19:25:06
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新班级管理
export const updateClassList = (data?: object) => {
  return http.request<Result>("post", `/class-info/update`, { data });
};

// 添加班级管理
export const addClassList = (data?: object) => {
  return http.request<Result>("post", `/class-info/create`, { data });
};

// 添加班级管理
export const findClassDetailed = (id?: string) => {
  return http.request<Result>("get", `/class-info/${id}`);
};
