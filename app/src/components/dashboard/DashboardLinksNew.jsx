import React from "react";
import ProfileCard from "./ProfileCard";
import Tools from "./Tools";
import DashboardLinks from "./DashboardLinks";
import Greetings from "./Greetings";
import axios from "axios";

import { useAuth } from "../../auth/auth";
import { useEffect, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLinksNew() {
  const auth = useAuth();
    const url = `http://localhost:3001/creator/${auth.user}`;

  const [userData, setUserData] = useState([]);
  const [creatorName, setCreatorName] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    logo: "",
    bio: "",
  });

  useEffect(() => {
    const nameValue = localStorage.getItem("Name");
    const tokenValue = localStorage.getItem("token");
    if (tokenValue && nameValue) {
      auth.setUser(nameValue);
      auth.setToken(tokenValue);
    }
    if (auth.user) {
    fetchData();
    }
    fetchData();
  }, [auth.user]);


 async function fetchData() {
   try {
     const response = await axios.get(url);
     if (response && response.data && response.data.length > 0) {
       setUserData(response.data);
       const creatorData = response.data[0];
       setCreatorName(creatorData.creatorname);
       setProfile({
         name: creatorData.creatorname,
         username: creatorData.creatorUsername,
         logo: creatorData.logo,
         bio: creatorData.bio,
       });
     } else {
       console.log("No data returned from server.");
     }
   } catch (error) {
     console.error(error);
   }
 }

  return (
    <div>

      <Greetings userName={creatorName} />
      <ProfileCard profile={profile} />
      <Tools ToolData={profile.username} />
      {userData.map((elem, c) => (
        <DashboardLinks key={c} LinksList={elem.Link} />
      ))}
    </div>
  );
}

