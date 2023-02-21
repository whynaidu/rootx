import React from "react";
import PageHeader from "./PageHeader";
import InsightsIcon from "@mui/icons-material/Insights";

export default function AnalyticsTools() {
  return (
    <div>
      <div className="bg-[#ffffff80] rounded-lg my-4">
        {/* <div className="p-4 flex items-center">
          <div className="text-md lg:text-2xl pb-2 px-2 mr-2 bg-indigo-200 text-indigo-800 rounded-full w-fit">
            <InsightsIcon />
          </div>
          <h1 className="text-xl">Analytics</h1>
        </div> */}

        <div className="p-3">
          <PageHeader title={"Analytics"} Icon={<InsightsIcon />} />
          <ul className="flex justify-evenly cursor-pointer">
            <li className="py-2 mr-1 w-full text-center text-purple-900 hover:bg-white bg-purple-200 rounded-md">
              Today
            </li>
            <li className="py-2  mx-1 w-full text-center hover:bg-purple-100 hover:text-black hover:border-purple-300 rounded-md text-gray-500 ">
              This Week
            </li>
            <li className="py-2 ml-1 w-full text-center hover:bg-white hover:text-black  rounded-md text-gray-500">
              This Month
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
