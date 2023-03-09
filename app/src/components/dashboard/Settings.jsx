import React from "react";
import { IoMdCog } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";

import PageHeader from "./PageHeader";

export default function Settings() {
  return (
    <div>
      <PageHeader title={"Settings"} Icon={<IoMdCog />} />
      <div className="bg-[#ffffff80] mt-5 mb-48 rounded-lg px-5 py-2 drop-shadow-2xl">
        {/* <div>
          <button className="bg-purple-300 p-2 rounded-lg flex items-center text-purple-800 font-bold">
            <BiArrowBack />
            &nbsp;Back
          </button>
        </div> */}

              <div className="m-2">
                  
        </div>
      </div>
    </div>
  );
}
