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
    <li>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={e => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
          {task.title}
        </span>
      )}

      <button onClick={() => onDelete(task.id)}>X</button>
    </li>
  );
}
