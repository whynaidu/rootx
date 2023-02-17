import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function SociaLinks() {
  return (
    <div>
      <div className="flex w-full mt-5">
        <div className=" w-full  flex justify-around">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
      </div>
    </div>
  );
}
