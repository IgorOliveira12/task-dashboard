console.log("TASK SERVICE LOADED ✅");


import type { Task, TaskCreate } from "../types/task";

const API_URL = "http://localhost:3001/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(data: TaskCreate): Promise<Task> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: data.title, completed: false }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
export async function updateTask(
  id: number,
  patch: Partial<Omit<Task, "id">>
): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(patch),
  });

  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

console.log("EXPORTS CHECK ✅", { getTasks, createTask, deleteTask });
