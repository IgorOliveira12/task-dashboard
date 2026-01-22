import { Outlet } from "react-router-dom";
import Header from "./header";
import React from "react";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
