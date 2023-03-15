import React from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../assets/profileImage.png";
import { IoMdSettings } from "react-icons/io";
import { IoAnalyticsSharp, IoHome } from "react-icons/io5";
import { FaRss } from "react-icons/fa";



export default function DashboardSidebar() {
  const auth = useAuth();
  const [CreatorName, setCreatorName] = useState();
  const [CreatorImage, setCreatorImage] = useState();
  const [glogin, setglogin] = useState(false);

  const navigate = useNavigate();
  const url = `http://localhost:3001/creator/${auth.user}`;

  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }

    if (auth.user) {
      getUsers();
      const intervalId = setInterval(() => {
        getUsers();
      }, 5000); // call getUsers every 10 seconds
      return () => clearInterval(intervalId); // cleanup function to clear interval
    }
  }, [auth.user, url]);

  const getUsers = async () => {
    try {
      const response = await axios.get(url);
      if (response && response.data && response.data.length > 0) {
        setCreatorName(response.data[0].creatorname);
        setCreatorImage(response.data[0].logo);
        setglogin(response.data[0].glogin);
      } else {
        console.log("No data returned from server.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  function logout() {
    auth.setUser(null);
    auth.setToken(null);
    localStorage.removeItem("Name");
    localStorage.removeItem("token");

    navigate("/login");
  }
  let activeStyle = {
    background: "rgb(107 33 168)",
    color: "white",
  };

  let activeStyleMobile = {
    margin: "5px",
    borderRadius: "50px",
    padding: "0 10px 0 10px",
    background: "rgb(107 33 168)",
    color: "white",
  };

  return (
    <div>
      <aside className="lg:flex flex-col hidden left-0 overflow-x-hidden overflow-y-auto z-50 w-56 fixed h-screen px-4 py-8 rounded-tr-3xl rounded-br-3xl shadow-xl bg-[#ffffff80] backdrop-blur-xl dark:border-gray-800">
        <a href="#" className="mx-auto">
          RootX
        </a>

        <div className="flex flex-col items-center mt-6 mx-2">
          {CreatorImage === null ? (
            <img
              className="object-cover w-20 ring-2 ring-purple-500 h-20 mx-2 rounded-full"
              src={ProfileImg}
            />
          ) : (
            <img
              className="object-cover w-20 ring-2 ring-purple-500 h-20 mx-2 rounded-full"
              src={`../../../public/profileImage/${CreatorImage}`}
            />
          )}

          <h4 className="mx-2 mt-2 font-medium ">{CreatorName}</h4>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard"
              className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <IoHome />

              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/analytics"
              className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
              href="#"
            >
              <IoAnalyticsSharp />

              <span className="mx-4 font-medium">Analytics</span>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/socialhub"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <FaRss />
              <span className="mx-4 font-medium">Socialhub</span>
            </NavLink>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/setting"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <IoMdSettings />

              <span className="mx-4 font-medium">Setting</span>
            </NavLink>
          </nav>
        </div>
        <button onClick={logout}>
          <div className="px-4 py-2 font-medium text-purple-800">
            <MeetingRoomIcon /> Logout
          </div>
        </button>
      </aside>

      <div className="lg:hidden block w-full h-0  ">
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-purple-300  rounded-full m-2 drop-shadow-lg"
        >
          <div id="tabs" className="flex justify-between h-14">
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/dashboard"
              href="#"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40 hover:rounded-lg  hover:m-2 flex items-center justify-center  text-center pt-1 pb-1 mx-1 px-[10px]"
            >
              <IoHome />
              <span className="tab tab-home block text-xs">&nbsp;Home</span>
            </NavLink>

            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/analytics"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40 hover:rounded-lg m-2 hover:m-2 flex items-center justify-center text-center pt-1 pb-1"
            >
              <IoAnalyticsSharp />

              <span className="tab tab-kategori block text-xs">
                &nbsp;Analytics
              </span>
            </NavLink>

            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/socialhub"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40  hover:rounded-lg m-2  hover:m-2 flex justify-center items-center text-center pt-1 pb-1"
            >
              <FaRss />
              <span className="tab tab-explore block text-xs">
                &nbsp;Social
              </span>
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/setting"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40  hover:rounded-lg m-2  hover:m-2 justify-center flex items-center  text-center pt-1 pb-1 px-2"
            >
              <IoMdSettings />
              <span className="tab tab-explore block text-xs ">
                &nbsp;Settings
              </span>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
}
