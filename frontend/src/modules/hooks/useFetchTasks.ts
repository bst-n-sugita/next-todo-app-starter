import { useState, useEffect, useCallback } from "react";

import { getTasks, TasksResponse } from "../apiClient";

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<TasksResponse | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    fetchTasks,
  };
};
