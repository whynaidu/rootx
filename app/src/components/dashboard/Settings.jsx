import React from "react";
import { IoMdCog, IoMdPerson } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import { MdColorLens } from "react-icons/md";
import { BsFillDoorOpenFill } from "react-icons/bs";

export default function Settings() {
  const auth = useAuth();
  const navigate = useNavigate();


  function logout() {
    auth.setUser(null);
    auth.setToken(null);
    localStorage.removeItem("Name");
    localStorage.removeItem("token");

    navigate("/login");
  }


  return (
    <div>
      <PageHeader title={"Settings"} Icon={<IoMdCog />} />
      <div className="bg-[#ffffff80] mt-5 mb-48 rounded-lg p-3 drop-shadow-2xl">
        <div className="lg:text-3xl text-2xl text-purple-800">
          <Link to="profile">
            <div className="flex items-center border-b border-purple-200 py-3">
              <div className="mx-4 mt-2 bg-purple-300 text-purple-800 rounded-full lg:h-12 lg:w-12 h-10 w-10 flex justify-center items-center">
                <IoMdPerson />
              </div>
              <h1>Profile</h1>
            </div>
          </Link>

          <Link to="themes">
            <div className="flex items-center border-b border-purple-200 py-2">
              <div className="mx-4 mt-2 bg-purple-300 text-purple-800 rounded-full lg:h-12 lg:w-12 h-10 w-10 flex justify-center items-center">
                <MdColorLens />
              </div>
              <h1>Themes</h1>
            </div>
          </Link>
        </div>

        <div className="justify-center lg:text-2xl text-xl text-purple-800 p-5 flex items-center">
          <button onClick={logout} className="flex">
            <BsFillDoorOpenFill />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
