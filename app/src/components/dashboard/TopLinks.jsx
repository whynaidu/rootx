import React, { useEffect, useState } from 'react'
import LinkIcon from "@mui/icons-material/Link";
import axios from 'axios';

export default function TopLinks() {

  const [topLinks, settopLinks] = useState([])
  

  useEffect(() => {
    async function topLinks() {
      const response = await axios.get(
        `http://localhost:3001/api/topLinks/naiduvedant@gmail.com`
      );
      console.log(response.data);
      settopLinks(response.data.linkViews);
    }
    topLinks();
  }, []); // Add an empty dependency array to the useEffect hook

  return (
    <div>
      <div className="mt-4 bg-[#ffffff80] rounded-lg p-3 drop-shadow-2xl">
        <h1 className="text-2xl text-bold pb-2">Top Roots</h1>

        <hr />
        <div>
          {topLinks.map((element, map) => (
            <div className="flex pt-2 items-center p-2 border-b border-purple-900/10">
              <div className="text-sm px-1 py-1 bg-indigo-200 text-indigo-800 rounded-full">
                <LinkIcon />
              </div>
              &nbsp;
              <h1 className="w-full mx-3">{element.linkName}</h1>
              <div className="flex justify-center items-center h-7 w-7 text-sm p-2 bg-indigo-200 text-indigo-800 rounded-full">
                {element.viewsCount}
              </div>

            </div>
            
          ))}
        </div>
      </div>
    </div>
  );
}
