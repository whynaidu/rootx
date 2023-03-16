import React from 'react'

export default function PageHeader(props) {
  return (
    <div className="bg-[#ffffff80] mt-5 rounded-lg px-3 py-2 drop-shadow-2xl">
      <div className="py-2 flex items-center">
        <div className="text-md lg:text-2xl py-2 px-2 mr-2 h-10 w-10 bg-purple-200 text-purple-800 rounded-full">
          {props.Icon}
        </div>
        <h1 className="text-xl">{props.title}</h1>
      </div>
    </div>
  );
}
