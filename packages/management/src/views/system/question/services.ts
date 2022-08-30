/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 19:50:17
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新班级管理
export const updateQuestionList = (data?: object) => {
  return http.request<Result>("post", `/question/update`, { data });
};

// 添加班级管理
export const addQuestionList = (data?: object) => {
  return http.request<Result>("post", `/question/create`, { data });
};

// 添加班级管理
export const findQuestionDetailed = (id?: string) => {
  return http.request<Result>("get", `/question/${id}`);
};


// 获取部门管理列表
export const getQuestionList = (params?: object) => {
  return http.request<Result>("get", "/question/list", { params });
};
// 删除部门管理
export const deleteQuestion = (id?: string) => {
  return http.request<Result>("post", `/question/remove/${id}`);
};

// 根据年级查询班级列表
export const getClassInfo = (params?: object) => {
  return http.request<Result>("get", "/grade/subjects", { params });
};
