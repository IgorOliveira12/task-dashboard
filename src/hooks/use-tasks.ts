import { useEffect, useState } from "react";
import { Task } from "../types/task";
import { getTasks } from "../services/task-service";
import React from "react";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  return { tasks, loading };
}
