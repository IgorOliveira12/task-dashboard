import { useEffect, useMemo, useState } from "react";
import type { Task, TaskCreate } from "../types/task";
import { createTask, deleteTask, getTasks, updateTask } from "../services/task-service"; 

type FilterStatus = "all" | "active" | "done";

export function useTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTasks()
      .then(data => {
        const normalized = data.map(t => ({ ...t, completed: Boolean(t.completed) }));
        setAllTasks(normalized);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  async function addTask(data: TaskCreate) {
    try {
      const created = await createTask(data);
      setAllTasks(prev => [...prev, created]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  async function removeTask(id: number) {
    try {
      await deleteTask(id);
      setAllTasks(prev => prev.filter(t => t.id !== id));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  async function editTask(id: number, title: string) {
    try {
      const updated = await updateTask(id, { title });
      setAllTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  async function setCompleted(id: number, completed: boolean) {
    try {
      const updated = await updateTask(id, { completed }); 
      setAllTasks(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    }
  }

  const remainingCount = useMemo(
    () => allTasks.filter(t => !t.completed).length,
    [allTasks]
  );

  const tasks = useMemo(() => {
    const query = search.toLowerCase().trim();

    return allTasks
      .filter(t => {
        if (status === "active") return !t.completed;
        if (status === "done") return t.completed;
        return true;
      })
      .filter(t => (query ? t.title.toLowerCase().includes(query) : true));
  }, [allTasks, status, search]);

  return {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    editTask,
    setCompleted,
    status,
    setStatus,
    search,
    setSearch,
    remainingCount,
  };
}