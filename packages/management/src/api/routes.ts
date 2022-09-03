import Axios from "axios";
import { IdentityEnum } from "/@/enums";

export const getAsyncRoutes = (identity: IdentityEnum) => {
  return Axios.get(`/getAsyncRoutes?identity=${identity}`);
};
