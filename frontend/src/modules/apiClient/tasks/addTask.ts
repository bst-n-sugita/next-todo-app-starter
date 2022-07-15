import { AxiosPromise } from "axios";

import { axiosInstance } from "..";
import { Task } from "./common";

export interface AddTaskResponse {
  addTask: Task;
}

export const addTask = (params: {
  name: string;
  description: string;
}): AxiosPromise<AddTaskResponse> => {
  return axiosInstance.post("/tasks", params);
};
