import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router';


export default function Backbutton() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button className="bg-purple-300 px-5 py-2 mt-5 rounded-lg flex items-center text-purple-800 font-bold"
        onClick={()=>navigate(-1)}>
            <BiArrowBack />
            &nbsp;Back
          </button>
        </div>
    </div>
  );
}
