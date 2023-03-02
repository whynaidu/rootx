import React from 'react'
import Image from "../../assets/profileImage.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";




export default function CreatorProifileCard() {

 const username = useParams();
 const url = `http://localhost:3001/${username.username}`;

 const [creator, setCreator] = useState([]);

 useEffect(() => {
   axios.get(url).then((res) => {
     setCreator(res.data[0]);
   });
 }, []);

  return (
    <>
      <div>
        <div className="justify-center card items-center rounded-lg py-5">
          <div className="flex justify-center w-full h-20">
            <div className="pulseLoader relative h-full"></div>
            {creator.logo === null ? (
              <img
                className="absolute ring-1 ring-blue-500 rounded-full h-[inherit]"
                src={Image}
              />
            ) : (
              <img
                className="absolute ring-1 w-20 ring-blue-500 rounded-full h-[inherit]"
                src={`../../../public/profileImage/${creator.logo}`}
              />
            )}

          </div>
          <div className="text-center">
            {creator.creatorname === null ? (
              <h1 className="p-2 font-bold hover:font-extrabold">
                Creator Name
              </h1>
            ) : (
              <h1 className="p-2 font-bold hover:font-extrabold">
                {creator.creatorname}
              </h1>
            )}
            {creator.bio === null ? (
              <p className="font-sans text-[12px] font-thin	p-2">Creator Bio</p>
            ) : (
              <p className="font-sans text-[12px] font-thin	p-2">
                {creator.bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
