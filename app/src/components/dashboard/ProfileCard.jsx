import React from "react";
import Image from "../../assets/pixel-5a-renders-leaked.jpg";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileImg from "../../assets/profileImage.png";

// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileCard(props) {
  const [profileData, setProfileData] = useState({});
  const [glogin, setglogin] = useState(false);

  useEffect(() => {
    setProfileData(props.profile);
    setglogin(profileData.logo);
  },[props]);

  return (
    <div>
      <div className="flex card items-center rounded-lg py-5 px-5 drop-shadow-2xl">
        <div className="flex h-16">
          <div className="pulseLoader2 relative h-full"></div>
          
          {profileData.logo === null ? (
            <img
              className="absolute ring-2 ring-purple-500 rounded-full w-16 h-16"
              src={ProfileImg}
            />
          ) : (
            <img
              className="absolute ring-2 ring-purple-500 rounded-full w-16 h-16"
              src={`../../../public/profileImage/${profileData.logo}`}
            />
          )}
        </div>
        <div className="px-4 w-full">
          <div className="flex flex-wrap">
            <h1 className="text-2xl text-purple-800 font-bold mr-3">
              {profileData.name}
            </h1>
            <span className="lg:text-lg text-slate-400 text-lg">
              ({profileData.username})
            </span>
          </div>
          <p className="font-sans text-[16px] font-thin	">{profileData.bio}</p>
        </div>
        <div>
          <Link to="/setting/profile">
            <EditIcon className="cursor-pointer transition hover:ease-in-out delay-700 text-purple-800 hover:scale-[1.3] hover:text-purple-800 duration-800 " />
          </Link>
        </div>
      </div>
    </div>
  );
}
