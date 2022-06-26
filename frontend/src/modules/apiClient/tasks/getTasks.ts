import { AxiosPromise } from "axios";

import { axiosInstance, Task } from "../index";

export interface TasksResponse {
  tasks: Task[];
}

export const getTasks = (): AxiosPromise<TasksResponse> => {
  return axiosInstance.get("/tasks");
};
