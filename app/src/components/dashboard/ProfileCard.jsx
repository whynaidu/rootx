import React from "react";
import Image from "../../assets/pixel-5a-renders-leaked.jpg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

export default function ProfileCard(props) {
//   const url = "http://localhost:3001/whynaidu";

 const [profileData, setProfileData] = useState({});

  useEffect(()=>{
  setProfileData(props.profile)
  })

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
            className="absolute ring-2 ring-purple-500 rounded-full h-[inherit]"
            src={Image}
          />
        </div>
        <div className="px-4 w-full">
          <div className="flex flex-wrap">
          <h1 className="text-2xl text-purple-800 font-bold mr-3">
            {profileData.name}
          </h1>
          <span className="lg:text-lg text-slate-400 text-lg">(@{profileData.username})</span>
          
          </div>
          <p className="font-sans text-[12px] font-thin	">{profileData.bio}</p>
        </div>
        <div>
          <Link to="/profile">
            <EditIcon className="cursor-pointer transition hover:ease-in-out delay-700 text-purple-800 hover:scale-[1.3] hover:text-purple-800 duration-800 " />
          </Link>
        </div>
      </div>
    </div>
  );
}
