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

export const getTestPaperReadInfo = (taskId: string, testPaperId: string) => {
  return http.request("get", `/exam/answer/${taskId}/${testPaperId}`);
};

export const submitTestPaper = data => {
  return http.request("post", "/exam/submit", { data });
};
