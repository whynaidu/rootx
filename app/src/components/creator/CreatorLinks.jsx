import React from "react";
import CreatorProifileCard from "./CreatorProifileCard";
import Links from "./Links";
import { useEffect, useState } from "react";
import SociaLinks from "./SociaLinks";
import axios from "axios";
import { useParams } from "react-router";

import BrandLink from "./BrandLink";

export default function CreatorLinks() {
  const username =useParams()
  const url = `http://localhost:3001/${username.username}`;


  const [links, setLinks] = useState([]);
  useEffect(() => {

    const fetchCreatorVisitedData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:3001/api/creatorVisited/${username.username}`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreatorVisitedData();
async function fetchLinks() {
  try {
    const response = await axios.get(url);

    
    setLinks(response.data);
  } catch (error) {
  
    console.log(error);
    // handle the error here
  }
}

fetchLinks();

  }, []);
  return (
    <>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <CreatorProifileCard />
        {links.map((element, c) => (
          <Links
            key={c}
            email={element.creatoremail}
            links={element.Link.reverse()}
          />
        ))}
        {links.map((social, w) => (
          <SociaLinks key={w} social={social.SocialLinks} />
        ))}
        <BrandLink />
      </div>
    </>
  );
}
