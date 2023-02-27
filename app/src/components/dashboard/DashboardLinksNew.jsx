import React from "react";
import ProfileCard from "./ProfileCard";
import Tools from "./Tools";
import DashboardLinks from "./DashboardLinks";
import Greetings from "./Greetings";
import axios from "axios";

import { useAuth } from "../../auth/auth";
import { useEffect, useState } from "react";

export default function DashboardLinksNew() {
  //  const auth = useAuth()

  const url = "http://localhost:3001/naiduvedant@gmail.com";

  const [userData, setuserData] = useState([]);
  const [creatorname, setCreatorName] = useState("")
  const [Profile, setProfile] = useState({
    name:"",
    username:"",
    logo:"",
    bio:""
    });

  useEffect(() => {

    async function fetchdata() {
      const data = await axios.get(url)
    setuserData(data.data);
      setCreatorName(data.data[0].creatorname)
      setProfile({
        name: data.data[0].creatorname,
        username: data.data[0].creatorUsername,
        logo: data.data[0].logo,
        bio: data.data[0].creatorname,
      });
    }
    fetchdata();
  }, []);
  return (
    <>
      <div>
        <Greetings userName={creatorname} />
        <ProfileCard profile={Profile} />
        {userData.map((elem, c) => (
          <DashboardLinks key={c} LinksList={elem.Link} />
        ))}
      </div>
    </>
  );
}
