/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 17:14:55
 */
import { http } from "../utils/http";

type Result = {
  svg?: string;
  code?: number;
  info?: object;
};

// 获取验证码
export const getVerify = () => {
  return http.request<Result>("get", "/captcha");
};

// 登录
export const getLogin = (data: object) => {
  return http.request("post", "/auth/login", null, { data });
};
// 用户信息
export const getInfo = () => {
  return http.request("get", "/user/profile");
};

// 刷新token
export const refreshToken = (data: object) => {
  return http.request("post", "/refreshToken", { data });
};
// 删除用户管理
export const deleteUser = (id?: string) => {
  return http.request<Result>("post", `/user/remove/${id}`);
};
// 更新用户管理
export const updateUser = (data?: object) => {
  return http.request<Result>("post", `/user/update`, { data });
};

// 添加用户管理
export const addUserList = (data?: object) => {
  return http.request<Result>("post", `/user/create`, { data });
};

// 获取用户管理详情
export const findUserDetailed = (id?: string) => {
  return http.request<Result>("get", `/user/${id}`);
};
// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
