import React from "react";


export default function AnalyticsTools() {
  return (
    <div>
      <div className="bg-[#ffffff80] rounded-lg my-4 w-full">
        <div className="p-3">
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
