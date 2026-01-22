import React from "react";
import { useTasks } from "../hooks/use-tasks";
import TaskItem from "../components/task/task-item";

export default function Tasks() {
  const { tasks, loading, error, addTask, removeTask, editTask } = useTasks();

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <section className="card tasks">
        <div className="tasks__top">
          <h1 className="tasks__title">Tasks</h1>

          <button className="btn btn--primary" 
          onClick={() => addTask({ title: "New task" })}
          >
            Add task
          </button>
        </div>

        <ul className="tasks__list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={removeTask}
              onEdit={editTask}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
