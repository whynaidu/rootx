import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardContent() {



  return (
    <div className="flex justify-center w-full" style={{backgroundImage: "linear-gradient(120deg, #fcfcfc 10%, #ebadff 100%)"
}}>
      <div className="w-full px-5 mr-0 lg:ml-64 max-w-screen-sm lg:max-w-screen-md">
        <DashboardSidebar />
        <Outlet/>
      </div>
    </div>
  );
}
