import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

export default function Backbutton(props) {
  // console.log(props)

  const navigate = useNavigate();
  return (
    <div>
      {/* {console.log(props.color)} */}
      <div className="flex justify-center">
        <button
          className={`bg-[#ffffff80] px-5 py-2 mt-5 rounded-lg flex items-center text-black font-bold`}
          onClick={() => navigate(-1)}
        >
          <BiArrowBack />
          &nbsp;Back
        </button>
      </div>
    </div>
  );
}
