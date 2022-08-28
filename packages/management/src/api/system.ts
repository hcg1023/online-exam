/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-27 19:54:46
 */
import { http } from "../utils/http";

type Result = {
  data?: {
    /** 列表数据 */
    list: Array<any>;
    /** 总数 */
    total: number;
  };
  code?: number;
  msg?: string;
};

// 获取用户管理列表
export const getUserList = (data?: object) => {
  return http.request<Result>("get", "/user/list", { data });
};
// 删除用户管理
export const deleteUser = (id?: string) => {
  return http.request<Result>("post", `/user/remove/${id}`);
};

// 获取角色管理列表
export const getRoleList = (data?: object) => {
  return http.request<Result>("post", "/role", { data });
};

// 获取部门管理列表
export const getDeptList = (params?: object) => {
  return http.request<Result>("get", "/class-info/list", { params });
};
// 删除部门管理
export const deleteDept = (id?: string) => {
  return http.request<Result>("post", `/class-info/remove/${id}`);
};

// 获取年级管理列表
export const getGradeList = (params?: object) => {
  return http.request<Result>("get", "/grade/list", { params });
};
// 删除年级部门管理
export const deleteGrade = (id?: string) => {
  return http.request<Result>("post", `/grade/remove/${id}`);
};
// 获取学科管理列表
export const getDisciplineList = (params?: object) => {
  return http.request<Result>("get", "/subject/list", { params });
};
// 删除年级部门管理
export const deleteDiscipline = (id?: string) => {
  return http.request<Result>("post", `/subject/remove/${id}`);
};
