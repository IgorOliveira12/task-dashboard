import { useTasks } from "../hooks/use-tasks";

export default function Tasks() {
  const { tasks, loading } = useTasks();

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <h1>Tasks</h1>

      {tasks.map(task => (
        <div key={task.id}>
          <strong>{task.title}</strong> — {task.status}
        </div>
      ))}
    </section>
  );
}
