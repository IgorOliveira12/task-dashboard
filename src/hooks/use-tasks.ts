import { useEffect, useState } from "react";
import type { Task, TaskCreate } from "../types/task";
import { getTasks, createTask, deleteTask, updateTask } from "../services/task-service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  async function addTask(data: TaskCreate) {
    try {
      const newTask = await createTask(data);
      setTasks(prev => [...prev, newTask]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  async function removeTask(id: number) {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  async function editTask(id: number, title: string) {
  try {
    const updated = await updateTask(id, { title });
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    setError(message);
  }
}

  return { tasks, loading, error, addTask, removeTask, editTask };
}
