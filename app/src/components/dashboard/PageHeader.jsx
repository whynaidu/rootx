import React from 'react'
import InsightsIcon from "@mui/icons-material/Insights";


export default function PageHeader(props) {
  return (
    <div>
      <div className="py-2 flex items-center">
        <div className="text-md lg:text-2xl pb-1 pt-0 px-2 mr-2 bg-purple-200 text-purple-800 rounded-full w-fit">
          <InsightsIcon fontSize="small" />
        </div>
        <h1 className="text-xl">{props.title}</h1>
      </div>
    </div>
  );
}
