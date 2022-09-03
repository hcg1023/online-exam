/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-09-03 16:11:57
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};

// 更新试卷管理
export const updateTestPaperList = (data?: object) => {
  return http.request<Result>("post", `/test-paper/update`, { data });
};

// 添加试卷管理
export const addTestPaperList = (data?: object) => {
  return http.request<Result>("post", `/test-paper/create`, { data });
};

// 查找试卷管理
export const findTestPaperDetailed = (id?: string) => {
  return http.request<Result>("get", `/test-paper/${id}`);
};
// 获取试卷列表
export const getTestPaperList = (params?: object) => {
  return http.request<Result>("get", "/test-paper/list", { params });
};
// 删除试卷管理
export const deleteTestPaper = (id?: string) => {
  return http.request<Result>("post", `/test-paper/remove/${id}`);
};
// 根据年级查询班级列表
export const getClassInfo = (params?: object) => {
  return http.request<Result>("get", "/grade/subjects", { params });
};
