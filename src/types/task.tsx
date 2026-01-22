export type TaskStatus = "todo" | "in-progress" | "done";
import React from "react";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type TaskCreate = {
  title: string;
};
