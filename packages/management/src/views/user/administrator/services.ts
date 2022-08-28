/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 19:12:58
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-28 17:15:45
 */
import { http } from "/@/utils/http";
type Result = {
  data?: {};
  code?: number;
  message?: string;
};
// 获取管理员列表
export const getAdministratorList = (params?: object) => {
  return http.request<Result>("get", "/user/admin/list", { params });
};
