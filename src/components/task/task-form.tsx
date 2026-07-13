import React, { useState } from "react";
import type { TaskCreate } from "../../types/task";

type Props = {
  onSubmit: (task: TaskCreate) => void;
};

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) return;

    onSubmit({
      title: trimmed,
    });

    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Write a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn--primary"
      >
        Add Task
      </button>
    </form>
  );
}