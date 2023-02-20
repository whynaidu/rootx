import React from 'react'
import AnalyticsTools from './AnalyticsTools';
import PageHeader from './PageHeader';
import TopLinks from './TopLinks';

export default function Analytics() {
  return (
    <div>
      <AnalyticsTools />
      <div className="flex">
        <div className="flex items-center w-full h-20 mr-2 bg-gray-100/70 rounded-lg">
          <div className="text-md lg:text-2xl px-3 py-2 mx-4 bg-indigo-200 text-indigo-800 rounded-full">
            20
          </div>
          <h1 className="text-md lg:text-2xl">Page Views</h1>
        </div>
        <div className="flex items-center w-full h-20 ml-2 bg-gray-100/70 rounded-lg">
          <div className="text-md lg:text-2xl px-3 py-2 mx-4 bg-purple-200 text-purple-800 rounded-full">
            10
          </div>
          <h1 className="text-md lg:text-2xl">Link Clicks</h1>
        </div>
      </div>

      <TopLinks />
    </div>
  );
}
