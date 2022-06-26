import { AxiosPromise } from "axios";

import { axiosInstance } from "../index";

import { Task } from ".";

export interface GetTasksResponse {
  tasks: Task[];
}

export const getTasks = (): AxiosPromise<GetTasksResponse> => {
  return axiosInstance.get("/tasks");
};
