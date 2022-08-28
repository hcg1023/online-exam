/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description: 
 * @LastEditTime: 2022-08-27 16:38:48
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

// export const searchVague = (data: object) => {
//   return http.request("post", "/searchVague", { data });
// };
