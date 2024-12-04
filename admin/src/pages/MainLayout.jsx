import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="flex w-full min-h-screen">
      <aside className="max-w-[400px] pt-[50px] bg-primary">
        <Sidebar />
      </aside>
      <div className="padding-x pt-[50px] w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
