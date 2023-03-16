import React from 'react'
import Image from "../../assets/profileImage.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";





export default function CreatorProifileCard() {
  const navigate = useNavigate();

 const username = useParams();
 const url = `http://localhost:3001/${username.username}`;

 const [creator, setCreator] = useState([]);

 useEffect(() => {
async function fetchCreator() {
  try {
    const res = await axios.get(url);
    setCreator(res.data[0]);
    
  } catch (error) {
    if (error.response && error.response.status === 404) {
      navigate("/notfound");
    } else {
      console.log(error);
      // Handle other errors here
    }
  }
}

 // Call the function to fetch the creator data
 fetchCreator();

 }, []);

  return (
    <>
      <div>
        <div className="justify-center card items-center rounded-lg py-5">
          <div className="flex justify-center w-full h-20">
            <div className="pulseLoader relative h-full"></div>
            {creator.logo === null ? (
              <img
                className={`absolute ring-2 ring-[${creator.colorTheme}] rounded-full h-[inherit]`}
                src={Image}
              />
            ) : (
              <img
                className={`absolute ring-2 ring-[${creator.colorTheme}] w-20 rounded-full h-[inherit]`}
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
