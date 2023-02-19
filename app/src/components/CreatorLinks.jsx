import React from 'react'
import CreatorProifileCard from './CreatorProifileCard'
import Links from './Links'
import { useEffect, useState } from "react";
import SociaLinks from './SociaLinks'
import axios from "axios";
import BrandLink from './BrandLink';


export default function CreatorLinks() {
 const url = "http://localhost:3001/whynaidu";

 const [links, setLinks] = useState([]);

 useEffect(() => {
   axios.get(url).then((res) => {
     setLinks(res.data);
     console.log(links)
   });
 }, []);
  return (
    <div>
      <CreatorProifileCard />
      {links.map((element, c) => (
        
        <Links
          key={c}
          url={element.linkUrl}
          name={element.linkName}
          imageUrl={element.linkImagName}
        />
        
      ))}

      <SociaLinks />
      <BrandLink />
    </div>
  );
}
