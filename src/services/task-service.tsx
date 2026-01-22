import { Task } from "../types/task";
import React from "react";

const API_URL = "http://localhost:3001/tasks";

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getTask(id: number): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}
