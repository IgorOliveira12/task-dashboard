import React, { useEffect, useRef, useState } from "react";
import type { Task } from "../../types/task";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
  onToggle: (id: number, completed: boolean) => void;
};

export default function TaskItem({ task, onDelete, onEdit, onToggle }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setValue(task.title);
  }, [task.title]);

  function cancelEdit() {
    setValue(task.title);
    setIsEditing(false);
  }

  function saveEdit() {
    const trimmed = value.trim();
    if (!trimmed) return cancelEdit();

    if (trimmed !== task.title) onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  return (
    <li className="task-item">
      <div className="task-item__left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={e => onToggle(task.id, e.target.checked)}
        />

        {isEditing ? (
          <input
            ref={inputRef}
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={e => {
              if (e.key === "Enter") saveEdit();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <span
            className="task-item__title"
            onDoubleClick={() => setIsEditing(true)}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.7 : 1,
            }}
            title="Double-click to edit"
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="task-item__actions">
        <button className="btn btn--danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
