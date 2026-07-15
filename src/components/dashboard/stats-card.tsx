import React from "react";

type Props = {
  title: string;
  value: number | string;
};

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="card stats-card">
      <h3>{title}</h3>
      <h1>{value}</h1>
    </div>
  );
}