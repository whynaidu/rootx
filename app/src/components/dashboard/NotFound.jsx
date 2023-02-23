import React from "react";
import NotFoundPng from "../../assets/pngwing.com.png"

export default function NotFound() {
  return (
    <div>
      <div className="bg-[#ffffff80] rounded-lg mx-6 my-6 flex justify-center lg:p-24 lg:py-[10rem] py-64 flex-col shadow-xl ">
        <div className="w-full ml-auto mr-auto">
          <img className="lg:h-1/4 lg:w-1/4 h-3/4 w-3/4 ml-auto mr-auto" src={NotFoundPng} />
        </div>
        <div className="w-full text-center mt-3">
          <h1 className="lg:text-6xl lg:font-black text-2xl font-black ">Oops! 404 Not Found</h1>
        </div>
      </div>
    </div>
  );
}
