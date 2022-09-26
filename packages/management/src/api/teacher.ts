import { http } from "/@/utils/http";

export const submitJudge = data => {
  return http.request("post", "/answer/judge", { data });
};

export const getTaskExamAnswer = (
  taskId: string,
  testPaperId: string,
  userId: number
) => {
  return http.request("get", `/answer/${taskId}/${testPaperId}/${userId}`);
};
