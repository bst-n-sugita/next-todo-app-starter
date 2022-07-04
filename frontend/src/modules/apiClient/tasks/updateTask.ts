import { AxiosPromise } from "axios";

import { axiosInstance } from "..";
import { Task } from "./common";

export interface UpdateTaskResponse {
  updateTask: Task;
}

export const updateTask = (params: {
  taskId: number;
  name: string;
  description: string;
}): AxiosPromise<UpdateTaskResponse> => {
  return axiosInstance.put(`/tasks/${params.taskId}`, params);
};
