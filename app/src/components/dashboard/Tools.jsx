import React from 'react'
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";


export default function Tools(props) {

  let [Tools, setTools] = useState({}
  )
  useEffect(() => {

    setTools(props.ToolData);
  
})
   const copy = async () => {
     await navigator.clipboard.writeText(
       `https://rootx.com/${Tools.creatorUsername}`
     );
   toast.success("Url Copied!");

  };
  function openUrl() {
    window.open(`https://rootx.com/${Tools.creatorUsername}`, "_blank");
  }



  return (
    <div>
      {console.log(Tools)}
      <Toaster position="top-right" className="bg-[#ffffff80]" />
      <div className="flex">
        <button
          className="px-5 py-2.5 relative mr-2 rounded w-full group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block"
          onClick={openUrl}
        >
          <span className="relative">
            <VisibilityIcon />
            &nbsp; Preview
          </span>
        </button>

        <button
          className="px-5 py-2.5 relative rounded ml-2 w-full group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block"
          onClick={copy}
        >
          <span className="relative">
            <ContentCopyIcon />
            &nbsp; Copy Link
          </span>
        </button>
      </div>
    </div>
  );
}
