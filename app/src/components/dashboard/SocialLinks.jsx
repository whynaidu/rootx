import React from "react";
import PageHeader from "./PageHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/auth";

import {
  FaRss,
  FaTwitch,
  FaTiktok,
  FaFacebook,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaDribbble,
  FaPinterest,
  FaSnapchat,
  FaSpotify,
} from "react-icons/fa";

export default function SocialHub() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [facebook, SetFacebook] = useState()


  const auth = useAuth();
  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }
    async function getSocial() {
      const response = await axios.get(
        `http://localhost:3001/api/getUserSocialLinks/${auth.user}/`
      );
      if (response.data && response.data.length > 0) {
        setSocialLinks(response.data[0].SocialLinks);
      }
    }
    getSocial();
  }, [auth.user, auth.setUser]);


  async function SocilaUpdate() {
    const update = await axios.post(`http://localhost:3001/api/`, {
      facebook: facebook,
    });
  }





  return (
    <>
      {/* <Toaster position="top-right" /> */}
      <div className="mb-48">
        <PageHeader title={"SocialHub"} Icon={<FaRss />} />

        <div className="bg-[#ffffff80] rounded-lg p-3 mt-5 bottom-3/4 mb-24 drop-shadow-2xl">
          <div className="relative flex">
            <div className="absolute z-0"></div>
            <div className="w-full lg:p-4 p-2 bg-transparent">
              <div className="grid gap-8 grid-cols-1">
                <div className="flex flex-col ">
                  <div className="flex flex-col sm:flex-row items-center"></div>
                  <div className="">
                    <form
                      onSubmit={SocilaUpdate}
                      method="post"
                      encType="mutipart/form-data"
                    >
                      <div className="form">
                        <div className="mb-4">
                          <label className="text-lg font-semibold text-gray-600">
                            Social Links
                          </label>
                        </div>
                        <div className="mb-3 space-y-2 w-full ">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900  h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaFacebook className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              onChange={(e) => SetFacebook(e.target.value)}
                              defaultValue={socialLinks.facebook}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.facebook.com/username/"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaInstagram className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.instagram}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.instagram.com/username/"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaTwitter className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.twitter}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaLinkedin className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.linkedin}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.linkedin.com/in/username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaTiktok className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.tiktok}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow  lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.tiktok.com/@username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaSpotify className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.spotify}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://open.spotify.com/user/userID"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaTelegramPlane className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.telegram}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://t.me/username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaYoutube className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.youtube}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.youtube.com/@username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaDribbble className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.dribble}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://dribbble.com/username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800 fill-purple-800">
                                <FaSnapchat className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.snapchat}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://t.snapchat.com/ID"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaPinterest className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.pinterest}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://in.pinterest.com/username/"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaTwitch className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.twitch}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://www.twitch.tv/username"
                            />
                          </div>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 w-16 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                <FaWhatsapp className="text-2xl" />
                              </span>
                            </div>
                            <input
                              type="text"
                              //onChange={handleProfileUsername}
                              defaultValue={socialLinks.whatsapp}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow lg:text-[15px] text-[11px] placeholder-gray-400"
                              placeholder="https://wa.me/XXXXXXXXXX"
                            />
                          </div>
                        </div>
                        <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                          <Link to="/dashboard">
                            <button className="mb-2 md:mb-0 text-black font-medium text-sm py-2 px-4 rounded-lg bg-slate-300 hover:bg-red-700 hover:text-white hover:shadow-lg">
                              Cancel
                            </button>
                          </Link>
                          <button
                            type="submit"
                            className="mb-2 md:mb-0 text-purple-900 font-medium text-sm py-2 px-4 rounded-lg bg-purple-300/90 hover:bg-purple-800 hover:text-white hover:shadow-lg"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
