import React, { useEffect, useRef, useState } from "react";
import type { Task } from "../../types/task";


type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string) => void;
};

export default function TaskItem({ task, onDelete, onEdit }: Props) {
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

  function cancel() {
    setValue(task.title);
    setIsEditing(false);
  }

  function save() {
    const trimmed = value.trim();
    if (!trimmed) return cancel();

    if (trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }
    setIsEditing(false);
  }

    return (
        <li className="task-item">
        <div className="task-item__left">
        {isEditing ? (
        <input
          ref={inputRef}
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={e => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
        />
      ) : (
        <span className="task-item__title" onDoubleClick={() => setIsEditing(true)}>
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