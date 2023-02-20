import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddNewLink() {
  return (
    <div>
      <button className="relative inline-flex items-center justify-center px-7 py-1 backdrop-blur-xl bg-gray-100/70 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-md shadow-md group">
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-800 group-hover:translate-x-0 ease">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-purple-800 transition-all duration-300 transform group-hover:translate-x-full ease">
          <AddIcon fontSize="medium" />
          &nbsp;New Root
        </span>
        <span className="relative invisible">New Root</span>
      </button>
    </div>
  );
}
