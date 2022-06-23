import { AxiosPromise } from "axios";

import { axiosInstance } from "../index";

export interface Task {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface TasksResponse {
  tasks: Task[];
}

export const getTasks = (): AxiosPromise<TasksResponse> => {
  return axiosInstance.get("/tasks");
};
