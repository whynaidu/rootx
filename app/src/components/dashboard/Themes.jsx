import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { MdColorLens, MdVisibility } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../auth/auth";
import toast, { Toaster } from "react-hot-toast";
import Backbutton from "./Backbutton";

export default function Themes() {
  // const auth = useAuth();

  // const [user, setuser] = useState("");

  // const getUsers = async () => {
  //   const url = `http://localhost:3001/creator/${auth.user}`;
  //   const getdata = await axios.get(url);
  //   const arrayData = getdata.data[0];
  //   setuser(arrayData.creatorUsername);
  // };

  // async function updateColorTheme(color) {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:3001/api/updateTheme/${auth.user}`,
  //       { color: color }
  //     );
  //     console.log(response.data);
  //     toast.success("Theme Updated");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   const tokenValue = localStorage.getItem("Name");
  //   if (tokenValue) {
  //     auth.setUser(tokenValue);
  //   }
  //   if (auth.user) {
  //     getUsers();
  //   }
  //   console.log("jii")

  //   const iframe = document.getElementById("creatorFrame");
  //   if (iframe) {
  //     iframe.contentWindow.location.reload();
  //   }
  // }, [auth.user, user]);

  const auth = useAuth();

  const [user, setUser] = useState("");
  const [selectedColor, setselectedColor] = useState("");

  const getUserData = async () => {
    const url = `http://localhost:3001/creator/${auth.user}`;
    const getdata = await axios.get(url);
    const arrayData = getdata.data[0];
    setUser(arrayData.creatorUsername);
    setselectedColor(arrayData.colorTheme);
    select();
  };

 

  const updateColorTheme = async (color) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/updateTheme/${auth.user}`,
        { color: color }
      );
      console.log(response.data);
      toast.success("Theme Updated");
      setselectedColor(response.data.colorTheme);
      // select();

    } catch (error) {
      console.error(error);
    }
  };

   function select() {
     const myDiv = document.getElementById(selectedColor);
     console.log(myDiv);
    //  myDiv.classList.add("ring-4");
   }
  
  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }
  }, []);

  useEffect(() => {
    
    select();
    if (auth.user) {
      getUserData();
    }
  }, [auth.user]);

  // useEffect(() => {
  //   const myDiv = document.getElementById(selectedColor);
  //   myDiv.classList.add(`ring-blue-900`);
  // }, [selectedColor]);

  return (
    <div>
      {console.log(selectedColor)}
      <Toaster position="top-right" />

      <PageHeader title={"Themes"} Icon={<MdColorLens />} />
      <Backbutton />
      <div className=" bg-[#ffffff80] mt-5 mb-48 rounded-lg px-3 py-2 drop-shadow-2xl">
        <div className="my-4 text-xl flex">
          <h1 className="w-full flex items-center mx-2 p-1 text-purple-800 font-medium">
            Select Theme
          </h1>
          <a href="http://localhost:5173/vedantnaidu" target="_blank">
            <button className="px-3 pt-2 pb-2 mr-2 rounded-lg group  backdrop-blur-xl bg-purple-300 font-medium text-purple-800  hover:bg-purple-800 hover:text-purple-200">
              <span className=" flex items-center">
                <MdVisibility />
                &nbsp;Preview
              </span>
            </button>
          </a>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="p-1 gap-2 grid grid-cols-3 w-full">
            <div
              className="lg:h-48 h-16 rounded-lg flex first-letter:first-line: justify-center items-center cursor-pointer text-red-700"
              onClick={() => updateColorTheme("#fc0303")}
              id="#fc0303"
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #fc0303 100%)",
              }}
            >
              Red
            </div>
            <div
              className="bg-blue-700 lg:h-48  h-16 rounded-lg flex justify-center items-center cursor-pointer text-blue-900"
              onClick={() => updateColorTheme("#0390fc")}
              id="#0390fc"
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #0390fc 100%)",
              }}
            >
              Blue
            </div>
            <div
              className="bg-purple-700 lg:h-48 h-16  rounded-lg flex justify-center items-center cursor-pointer text-purple-700"
              onClick={() => updateColorTheme("#f003fc")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #f003fc 100%)",
              }}
            >
              Purple
            </div>
            <div
              className="bg-green-700 lg:h-48 h-16  rounded-lg flex justify-center items-center cursor-pointer text-green-700"
              onClick={() => updateColorTheme("#24fc03")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #24fc03 100%)",
              }}
            >
              Green
            </div>
            <div
              className="bg-black lg:h-48 h-16  rounded-lg flex justify-center items-center cursor-pointer text-white"
              onClick={() => updateColorTheme("#000000")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #000000 100%)",
              }}
            >
              Black
            </div>
            <div
              className="bg-yellow-700 lg:h-48 h-16  rounded-lg flex justify-center items-center cursor-pointer text-yellow-900"
              onClick={() => updateColorTheme("#d7ed11")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #d7ed11 100%)",
              }}
            >
              Yellow
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
