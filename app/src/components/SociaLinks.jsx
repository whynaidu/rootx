import React from 'react'
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";



export default function SociaLinks() {
   

  return (
    <div>
      <div className="flex w-full py-5">
        <div className=" w-full text-3xl flex justify-around">
          <FacebookIcon fontSize="inherit" />
          <TwitterIcon fontSize="inherit" />
          <InstagramIcon fontSize="inherit" />
          <TwitterIcon fontSize="inherit" />
          <InstagramIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
}
