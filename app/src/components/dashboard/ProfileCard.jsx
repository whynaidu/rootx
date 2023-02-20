import React from "react";
import Image from "../../assets/pixel-5a-renders-leaked.jpg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProfileCard() {
//   const url = "http://localhost:3001/whynaidu";

//   const [links, setLinks] = useState([]);

//   useEffect(() => {
//     axios.get(url).then((res) => {
//       setLinks(res.data);
//       console.log(links);
//     });
//   }, []);

  return (
    <div>
      <div className="flex card items-center rounded-lg py-5 px-5">
        <div className="flex h-16">
          <div className="pulseLoader2 relative h-full"></div>

          <img
            className="absolute ring-1 ring-purple-500 rounded-full h-[inherit]"
            src={Image}
          />
        </div>
        <div className="px-4 w-full">
          <h1 className="text-2xl text-purple-800  font-bold w-full">
            Vedant Naidu
          </h1>
          <p className="font-sans text-[12px] font-thin	">
            Software Developer at SlashRTC
          </p>
        </div>
        <div>
          <EditIcon/>
        </div>
      </div>
    </div>
  );
}
