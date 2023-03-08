import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { MdColorLens } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../auth/auth";
import toast, { Toaster } from "react-hot-toast";

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

  const getUserData = async () => {
    const url = `http://localhost:3001/creator/${auth.user}`;
    const getdata = await axios.get(url);
    const arrayData = getdata.data[0];
    setUser(arrayData.creatorUsername);
  };

  const updateColorTheme = async (color) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/updateTheme/${auth.user}`,
        { color: color }
      );
      console.log(response.data);
      toast.success("Theme Updated");
    } catch (error) {
      console.error(error);
    }
  };

  const reloadIframe = () => {
    const iframe = document.getElementById("creatorFrame");
    if (iframe) {
      iframe.contentWindow.location.reload();
    }
  };

  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user) {
      getUserData();
    }
  }, [auth.user]);

  useEffect(() => {
    reloadIframe();
  }, [user]);



  return (
    <div>
      {console.log(user)}
      <Toaster position="top-right" />

      <PageHeader title={"Themes"} Icon={<MdColorLens />} />
      <div className=" bg-[#ffffff80] mt-5 mb-48 rounded-lg px-3 py-2 drop-shadow-2xl">
        <div className="my-4 text-xl">
          <h1>Select a Theme</h1>
        </div>
        <div className="flex">
          <div className="p-1 gap-2 grid grid-cols-2 w-full">
            <div
              className="lg:h-56  h-28 rounded-lg flex justify-center items-center cursor-pointer text-red-700"
              onClick={() => updateColorTheme("#fc0303")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #fc0303 100%)",
              }}
            >
              Red
            </div>
            <div
              className="bg-blue-700 lg:h-56  h-28 rounded-lg flex justify-center items-center cursor-pointer text-blue-900"
              onClick={() => updateColorTheme("#0390fc")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #0390fc 100%)",
              }}
            >
              Blue
            </div>
            <div
              className="bg-purple-700 lg:h-56 h-28  rounded-lg flex justify-center items-center cursor-pointer text-purple-700"
              onClick={() => updateColorTheme("#f003fc")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #f003fc 100%)",
              }}
            >
              Purple
            </div>
            <div
              className="bg-green-700 lg:h-56 h-28  rounded-lg flex justify-center items-center cursor-pointer text-green-700"
              onClick={() => updateColorTheme("#24fc03")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #24fc03 100%)",
              }}
            >
              Green
            </div>
            <div
              className="bg-black lg:h-56 h-28  rounded-lg flex justify-center items-center cursor-pointer text-white"
              onClick={() => updateColorTheme("#000000")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #000000 100%)",
              }}
            >
              Black
            </div>
            <div
              className="bg-yellow-700 lg:h-56 h-28  rounded-lg flex justify-center items-center cursor-pointer text-yellow-900"
              onClick={() => updateColorTheme("#d7ed11")}
              style={{
                backgroundImage:
                  "linear-gradient(140deg, #fcfcfc 5%, #d7ed11 100%)",
              }}
            >
              Yellow
            </div>
          </div>
          <div className="w-full p-2">
            <iframe
              id="creatorFrame"
              src={`http://localhost:5173/${user}`}
              // src="http://localhost:5173/vedantnaidu"
              className="overflow-hidden rounded-xl lg:h-full lg:w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
