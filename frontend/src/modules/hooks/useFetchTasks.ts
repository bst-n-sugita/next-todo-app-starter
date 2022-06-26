import { useState, useEffect, useCallback } from "react";

import { Task } from "../apiClient/tasks";
import { getTasks } from "../apiClient/tasks/getTasks";

export const useFetchTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setTasks(data.tasks);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    setTasks,
  };
};
