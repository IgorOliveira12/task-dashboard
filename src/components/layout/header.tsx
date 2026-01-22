import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="brand">
          <span className="brand__dot" />
          <span>Task Dashboard</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>

          <NavLink to="/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
            Tasks
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
