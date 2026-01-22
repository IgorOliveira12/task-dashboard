export type TaskStatus = "todo" | "in-progress" | "done";
import React from "react";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
}
