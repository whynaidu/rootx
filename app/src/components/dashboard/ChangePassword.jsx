import React from 'react'
import PageHeader from './PageHeader'
import { CgPassword } from "react-icons/cg";

export default function ChangePassword() {
  return (
    <div>
      <PageHeader Icon={<CgPassword />} title={"Change Password"} />
      <div className="bg-[#ffffff80] rounded-lg p-3 mt-5 py-4">
       
      </div>
    </div>
  );
}
