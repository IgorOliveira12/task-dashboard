import React from "react";
import { useTasks } from "../hooks/use-tasks";
import TaskItem from "../components/task/task-item";
import TaskFilters from "../components/task/task-filters";
import TaskForm from "../components/task/task-form";

export default function Tasks() {
  const {
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
  } = useTasks();

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <section className="card tasks">
        <div className="tasks__top">
          <h1 className="tasks__title">Tasks</h1>

          <TaskForm onSubmit={addTask} />
          </div>

        <TaskFilters
          status={status}
          setStatus={setStatus}
          search={search}
          setSearch={setSearch}
          remainingCount={remainingCount}
        />
        

        <ul className="tasks__list">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={removeTask}
              onEdit={editTask}
              onToggle={setCompleted}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
