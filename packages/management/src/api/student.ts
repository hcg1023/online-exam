import { http } from "/@/utils/http";

interface Result {
  data?: {
    /** 列表数据 */
    results: Array<any>;
    /** 总数 */
    total: number;
  };
  code?: number;
  message?: string;
}

export const getStudentTasks = (params?: object) => {
  return http.request<Result>("get", "/exam/tasks", { params });
};

export const getTaskTestPaperInfo = (taskId: string, testPaperId: string) => {
  return http.request("get", `/exam/${taskId}/${testPaperId}`);
};
