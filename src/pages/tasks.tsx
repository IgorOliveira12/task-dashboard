import React from "react";
import { useTasks } from "../hooks/use-tasks";
import TaskItem from "../components/task/task-item";


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
          <TaskItem
            key={task.id}
            task={task}
            onDelete={removeTask}
            onEdit={editTask}
          />
        ))}
      </ul>
    </div>
  );
}
