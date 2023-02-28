import React from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import InsightsIcon from "@mui/icons-material/Insights";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink } from "react-router-dom";
import Profile from "../../assets/pixel-5a-renders-leaked.jpg";
import { useAuth } from "../../auth/auth";
import { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";


export default function DashboardSidebar() {

  const auth = useAuth();
  const [CreatorName, setCreatorName] = useState()
  const navigate = useNavigate();



   useEffect(() => {
     const tokenValue = localStorage.getItem("Name");
     if (tokenValue) {
       auth.setUser(tokenValue);
       
     }

     const url = auth.user
       ? `http://localhost:3001/${auth.user}`
       : "http://localhost:3001/";  

     const getUsers = async () => {
       const getdata = await axios.get(url);
      setCreatorName(getdata.data[0].creatorname);
     };
     getUsers();
   },[auth.user]);

function logout()
{
  auth.setUser(null)
  auth.setToken(null);
  localStorage.removeItem("Name")
  console.log(auth)
   navigate("/login");
}
     let activeStyle = {
       background: "rgb(107 33 168)",
       color: "white",
     };

  let activeStyleMobile = {
     margin:"10px",
     borderRadius:"10px",
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
          <img
            className="object-cover w-20 ring-2 ring-purple-500 h-20 mx-2 rounded-full"
            src={Profile}
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium ">{CreatorName}</h4>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/dashboard"
              className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/analytics"
              className="flex items-center px-4 py-2 mt-5 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
              href="#"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Analytics</span>
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/profile"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="mx-4 font-medium">Profile</span>
            </NavLink>

            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
              to="/socialhub"
              className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-purple-700 hover:bg-gray-100 dark:hover:bg-purple-800 dark:hover:text-gray-200 hover:text-gray-800"
            >
              <ConnectWithoutContactIcon />
              <span className="mx-4 font-medium">Socialhub</span>
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
          className="block fixed inset-x-0 bottom-0 z-10 bg-purple-200 rounded-tr-xl rounded-tl-xl"
        >
          <div id="tabs" className="flex justify-between">
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/dashboard"
              href="#"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40 hover:rounded-lg  hover:m-2 justify-center inline-block text-center pt-1 pb-1 mt-2"
            >
              <DashboardIcon />
              <span className="tab tab-home block text-xs">Dashboard</span>
            </NavLink>

            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/analytics"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40 hover:rounded-lg m-2 hover:m-2 justify-center inline-block text-center pt-1 pb-1"
            >
              <InsightsIcon />

              <span className="tab tab-kategori block text-xs">Analytics</span>
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/profile"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40  hover:rounded-lg m-2  hover:m-2 justify-center inline-block text-center pt-1 pb-1"
            >
              <PersonIcon />
              <span className="tab tab-explore block text-xs">Profile</span>
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive ? activeStyleMobile : undefined
              }
              to="/socialhub"
              className="w-full focus:text-purple-800 hover:text-purple-800 hover:bg-purple-400/40  hover:rounded-lg m-2  hover:m-2 justify-center inline-block text-center pt-1 pb-1"
            >
              <ConnectWithoutContactIcon />
              <span className="tab tab-explore block text-xs">SocialHub</span>
            </NavLink>
          </div>
        </section>
      </div>
    </div>
  );
}
