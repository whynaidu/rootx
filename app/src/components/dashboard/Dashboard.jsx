import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardContent() {



  return (
    <div className="flex justify-center pb-10 w-full">
      <div className="w-full px-5 mr-0 lg:ml-64 max-w-screen-sm lg:max-w-screen-md ">
        <DashboardSidebar />
        <Outlet />
      </div>
    </div>
  );
}
