/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-09-03 20:31:56
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新试卷管理
export const updateTestList = (data?: object) => {
  return http.request<Result>("post", `/task/update`, { data });
};

// 添加试卷管理
export const addTestList = (data?: object) => {
  return http.request<Result>("post", `/task/create`, { data });
};

// 查找试卷管理
export const findTestDetailed = (id?: string) => {
  return http.request<Result>("get", `/task/${id}`);
};
// 获取试卷列表
export const getTestList = (params?: object) => {
  return http.request<Result>("get", "/task/list", { params });
};
// 删除试卷管理
export const deleteTest = (id?: string) => {
  return http.request<Result>("post", `/task/remove/${id}`);
};
