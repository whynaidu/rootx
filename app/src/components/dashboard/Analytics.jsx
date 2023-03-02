import React, { useEffect, useState } from 'react'
import axios from "axios";
import PageHeader from './PageHeader';
import TopLinks from './TopLinks';
import InsightsIcon from "@mui/icons-material/Insights";

export default function Analytics() {

  const [pageViews, setpageViews] = useState();
      const [linkViews, setlinkViews] = useState();


  useEffect(() => {
    async function topLinks() {
      const response = await axios.get(
        `http://localhost:3001/api/topLinks/naiduvedant@gmail.com`
      );
      console.log(response.data.PageviesCount);
      setpageViews(response.data.PageviesCount);
            setlinkViews(response.data.totalCount);

    }
    topLinks();
  }, []);


  return (
    <div>
      <PageHeader title={"Analytics"} Icon={<InsightsIcon />} />

      <div className="flex">
        <div className="w-full">
          {/* <AnalyticsTools /> */}
          <div className="flex mt-4">
            <div className="flex items-center w-full h-20 mr-2  bg-[#ffffff80] rounded-lg">
              <div className="flex justify-center items-center h-10 w-10 text-xl lg:text-2xl px-3 py-2 mx-4 bg-indigo-200 text-indigo-800 rounded-full">
                {pageViews}
              </div>
              <h1 className="text-md lg:text-2xl">Page Views</h1>
            </div>
            <div className="flex items-center w-full h-20 ml-2 bg-[#ffffff80] rounded-lg">
              <div className="flex justify-center items-center text-xl lg:text-2xl h-10 w-10 mx-4 bg-purple-200 text-purple-800 rounded-full">
                {linkViews}
              </div>
              <h1 className="text-md lg:text-2xl">Link Clicks</h1>
            </div>
          </div>
        </div>
      </div>

      <TopLinks />
    </div>
  );
}
