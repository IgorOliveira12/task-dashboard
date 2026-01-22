import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Layout from "./components/layout/layout";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/tasks";
import TaskDetails from "./pages/tasks-details";
import About from "./pages/about";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:id" element={<TaskDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
