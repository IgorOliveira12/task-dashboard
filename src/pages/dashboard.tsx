import React, { useEffect, useState } from "react";
import { getTasks } from "../services/task-service";
import type { Task } from "../types/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const remaining = total - completed;
  const StatsCard = ({ title, value }: { title: string; value: number | string }) => (
  <div className="card">
    <h3>{title}</h3>
    <h1>{value}</h1>
  </div>
);

  if (loading) {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <p>A carregar...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <StatsCard
          title="Total Tasks"
          value={total}
        />

        <StatsCard
          title="Completed"
          value={completed}
        />

        <StatsCard
          title="Remaining"
          value={remaining}
        />
      </div>
    </div>
  );
}