import React from 'react'
import Image from "../assets/pixel-5a-renders-leaked.jpg";
import axios from "axios";
import { useEffect, useState } from "react";


export default function CreatorProifileCard() {

 const url = "http://localhost:3001/whynaidu";

 const [links, setLinks] = useState([]);

 useEffect(() => {
   axios.get(url).then((res) => {
     setLinks(res.data);
     console.log(links);
   });
 }, []);

  return (
    <div>
      <div className="justify-center card items-center rounded-lg py-5">
        <div className="flex justify-center w-full h-20">
          <div className="pulseLoader relative h-full"></div>
          
          <img
            className="absolute ring-1 ring-blue-500 rounded-full h-[inherit]"
            src={Image}
          />
        </div>
        <h1 className="p-2 font-bold hover:font-extrabold">Vedant Naidu</h1>
        <p className="font-sans text-[12px] font-thin	p-2">
          Software Developer at SlashRTC
        </p>
      </div>
    </div>
  );
}
