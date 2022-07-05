import { AxiosPromise } from "axios";

import { axiosInstance } from "..";

export const deleteTask = (taskId: number): AxiosPromise => {
  return axiosInstance.delete(`/tasks/${taskId}`);
};
