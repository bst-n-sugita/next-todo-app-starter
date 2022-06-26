import { AxiosPromise } from "axios";

import { axiosInstance } from "..";
import { Task } from "./common";

export interface GetTasksResponse {
  tasks: Task[];
}

export const getTasks = (): AxiosPromise<GetTasksResponse> => {
  return axiosInstance.get("/tasks");
};
