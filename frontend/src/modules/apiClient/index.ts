import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_HOST,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_SECRET,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export interface Task {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}
