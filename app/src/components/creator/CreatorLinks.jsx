import React from "react";
import CreatorProifileCard from "./CreatorProifileCard";
import Links from "./Links";
import { useEffect, useState } from "react";
import SociaLinks from "./SociaLinks";
import axios from "axios";
import BrandLink from "./BrandLink";

export default function CreatorLinks() {
  const url = "http://localhost:3001/naiduvedant@gmail.com";

  const [links, setLinks] = useState([]);
  useEffect(() => {
    axios.get(url).then((res) => {
      setLinks(res.data);
    });
  }, []);
  return (
    <>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <CreatorProifileCard />
        {links.map((element, c) => (
          <Links key={c} links={element.Link} />
        ))}
        {links.map((social, w) => (
          <SociaLinks key={w} social={social.SocialLinks} />
        ))}
        <BrandLink />
      </div>
    </>
  );
}
