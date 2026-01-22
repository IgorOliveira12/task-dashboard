import { useParams } from "react-router-dom";
import React from "react";

type RouteParams = {
  id: string;
};

export default function TaskDetails() {
  const { id } = useParams<RouteParams>();

  return (
    <div>
      <h1>Task Details</h1>
      <p>Task ID: {id}</p>
    </div>
  );
}
