/*
 * @Author: @yzcheng
 * @Date: 2022-08-27 13:46:33
 * @Version: 1.0
 * @LastEditors: @yzcheng
 * @Description:
 * @LastEditTime: 2022-08-27 16:30:29
 */
import Cookies from "js-cookie";
import { useUserStoreHook } from "/@/store/modules/user";

const TokenKey = "authorized-token";

type paramsMapType = {
  accessToken: string;
};

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get("authorized-token");
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
// 后端需要将用户信息和token以及过期时间都返回给前端，过期时间主要用于刷新token
export function setToken({data}:any) {
  const { accessToken } = data;
  // 提取关键信息进行存储
  const paramsMap: paramsMapType = {
    accessToken
  };
  const dataString = JSON.stringify(paramsMap);
  useUserStoreHook().SET_TOKEN(accessToken);
  // expires > 0
  //   ? Cookies.set(TokenKey, dataString, {
  //       expires: expires / 86400000
  //     })
  //   :
  Cookies.set(TokenKey, dataString);
  sessionStorage.setItem(TokenKey, dataString);
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.removeItem(TokenKey);
}
