import Axios from "axios";

export const getAsyncRoutes = (params?: object) => {
  return Axios.get(`/getAsyncRoutes?name=${params}`);
};