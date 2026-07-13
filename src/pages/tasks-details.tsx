import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask } from "../services/task-service";
import type { Task } from "../types/task";

export default function TaskDetails() {
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getTask(Number(id))
      .then(setTask)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!task) {
    return <div className="container">Task not found.</div>;
  }

  return (
    <div className="container">
      <section className="card tasks">
        <h1>{task.title}</h1>

        <p>
          <strong>ID:</strong> {task.id}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {task.completed ? "Completed" : "Active"}
        </p>

        <Link className="btn" to="/tasks">
          ← Back
        </Link>
      </section>
    </div>
  );
}
