import React from 'react'
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function Tools() {
  return (
    <div>
      <div className="flex">
        <button className="px-5 py-2.5 relative mr-2 rounded w-full group overflow-hidden font-medium backdrop-blur-xl bg-gray-100/70 text-purple-600 inline-block">
          <span className="relative">
            <VisibilityIcon />
            &nbsp; Preview{" "}
          </span>
        </button>

        <button className="px-5 py-2.5 relative rounded ml-2 w-full group overflow-hidden font-medium backdrop-blur-xl bg-gray-100/70  text-purple-600 inline-block">
          <span className="relative">
            <ContentCopyIcon />
            &nbsp; Copy Link
          </span>
        </button>
      </div>
    </div>
  );
}
