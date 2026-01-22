import React from "react";
import { useTasks } from "../hooks/use-tasks";

export default function Tasks() {
  const { tasks, loading, error, addTask, removeTask, editTask } = useTasks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Tasks</h1>

      <button onClick={() => addTask({ title: "Nova task" })}>Add task</button>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}{" "}
            <button onClick={() => removeTask(task.id)}>X</button>{" "}
            <button
              onClick={() => {
                const newTitle = prompt("New title?", task.title);
                if (newTitle && newTitle.trim()) {
                  editTask(task.id, newTitle.trim());
                }
              }}
            >
              Rename
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
