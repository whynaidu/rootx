import React from "react";
import Image from "../assets/pixel-5a-renders-leaked.jpg";

export default function Links(props) {
  return (
    <div>
      <a href={props.url} target="_blank" onClick="alert('The link was clicked!')">
        <div className="flex w-full card px-1.5 py-1.5 hover:shadow-indigo-500/40 lg:max-w-full rounded-md">
          <div className="border-1 h-14 w-16 rounded-lg">
            <img
              src={props.imageUrl}
              alt=""
              className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]	"
            />
          </div>
          <div className=" grid content-center w-full space-y-2 text-center">
            <h3 className="text-1xl font-semibold lg:text-2xl">
              {props.name}
            </h3>
          </div>
        </div>
      </a>
    </div>
  );
}
