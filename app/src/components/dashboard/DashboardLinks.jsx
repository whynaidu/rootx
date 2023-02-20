import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
import AddNewLink from "./AddNewLink"


export default function DashboardLinks() {
  return (
    <div>
      <div className="pb-2 text-xl flex justify-center">
        <h1 className="my-5 py-1 px-3 bg-purple-100/30 rounded-md w-fit">
          Roots
        </h1>
      </div>
      <AddNewLink />
      <div className="flex w-full card px-1.5 py-1.5 items-center pr-4 hover:shadow-indigo-500/40 lg:max-w-full rounded-md">
        <div className="border-1 h-14 w-16 rounded-lg">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]	"
          />
        </div>
        <div className="grid w-full space-y-2 text-center">
          <h3 className="text-1xl text-purple-800 font-semibold lg:text-2xl">Hiii</h3>
        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    </div>
  );
}
