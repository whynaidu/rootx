import React from "react";
import Image from "../assets/pixel-5a-renders-leaked.jpg";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <div>
      <a href="https://www.npmjs.com/package/react-router-dom" target='_blank'>
        <div className="flex w-full card px-1.5 py-1.5 hover:shadow-indigo-500/40 lg:max-w-full rounded-md">
          <div className="border-1 h-14 w-16 rounded-lg">
            <img
              src={Image}
              alt=""
              className="border h-[inherit] object-cover rounded-lg max-h-full	"
            />
          </div>
          <div className=" grid content-center w-full space-y-2 text-center">
            <h3 className="text-1xl font-semibold lg:text-2xl">
              Google Pixel 5a and It Looks
            </h3>
          </div>
        </div>
      </a>
    </div>
  );
}
