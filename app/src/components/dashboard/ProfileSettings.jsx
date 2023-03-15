import React from "react";
import PageHeader from "./PageHeader";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { useAuth } from "../../auth/auth";

import toast, { Toaster } from "react-hot-toast";
import ProfileImg from "../../assets/profileImage.png";
import { useEffect, useState } from "react";
import Backbutton from "./Backbutton";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings() {
  const auth = useAuth();
    const navigate = useNavigate();

  const [ImageData, setImageData] = useState(null);
  const [UpdateProfileImage, setUpdateProfileImage] = useState(null);
  const [ProfileImage, setnewProfileImage] = useState(null);
  const [ProfileName, setProfileName] = useState("");
  const [ProfileEmail, setProfileEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ProfileBio, setProfileBio] = useState("");
  const [ProfileUsername, setProfileUsername] = useState("");
  const [newProfileName, setnewProfileName] = useState("");
  const [newProfileBio, setnewProfileBio] = useState(null);
  const [newProfileUsername, setnewProfileUsername] = useState("");
  const [deleteCondition, setdeleteCondition] = useState(false);

  function AddcloseModal() {
    setIsOpen(false);
  }

  function AddopenModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }
    if (auth.user) {
      getUsers();
    }
  }, [auth.user]);

  const getUsers = async () => {
    const url = `http://localhost:3001/creator/${auth.user}`;
    const getdata = await axios.get(url);
    const arrayData = getdata.data[0];
    setImageData(arrayData.logo);
    setProfileName(arrayData.creatorname);
    setProfileBio(arrayData.bio);
    setProfileEmail(arrayData.creatoremail);
    setProfileUsername(arrayData.creatorUsername);
  };

  function handleProfileName(click) {
    setnewProfileName(click.target.value);
  }
  function handleProfileBio(click) {
    setnewProfileBio(click.target.value);
  }
  function handleProfileUsername(click) {
    setnewProfileUsername(click.target.value);
  }

  function handleProfileImage(click) {
    setUpdateProfileImage(click.target.files[0]);

    setnewProfileImage(URL.createObjectURL(click.target.files[0]));
  }

  async function updateSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "name",
      newProfileName === "" ? ProfileName : newProfileName
    );
    formData.append(
      "profileImage",
      UpdateProfileImage === "" ? ProfileImage : UpdateProfileImage
    );
    formData.append(
      "bio",
      newProfileBio === ""
        ? ProfileBio
        : newProfileBio === null
        ? null
        : newProfileBio
    );
    formData.append(
      "username",
      newProfileUsername === "" ? ProfileUsername : newProfileUsername
    );

    try {
      const response = await axios.post(
        `http://localhost:3001/api/profile/${auth.user}`,
        formData
      );

      const { creatorname, creatorUsername, bio, logo } = response.data;
      setImageData(logo);
      setProfileName(creatorname);
      setProfileBio(bio);
      setProfileUsername(creatorUsername);
      setnewProfileImage(null);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  }

  function deletefield(e) {
    if (ProfileUsername === e.target.value) {
      setdeleteCondition(true);
    } else {
      setdeleteCondition(false);
    }
  }

    function logout() {
      auth.setUser(null);
      auth.setToken(null);
      localStorage.removeItem("Name");
      localStorage.removeItem("token");

      navigate("/login");
    }

  async function deleteCreator() {
    try {
      const deleteuser = await axios.post(
        `http://localhost:3001/api/deleteuser/${auth.user}`
      );
      if (deleteuser.status === 200) {
        logout();
      }
      
    } catch {}
  }
  return (
    <>
      <Toaster position="top-right" />
      {console.log(deleteCondition)}

      <div className="mb-16">
        <PageHeader title={"Profile"} Icon={<PersonIcon />} />
        <Backbutton />
        <div className="bg-[#ffffff80] rounded-lg p-3 mt-5">
          <div className="relative flex">
            <div className="absolute z-0"></div>
            <div className="w-full lg:p-4 p-2 bg-transparent z-10">
              <div className="grid gap-8 grid-cols-1">
                <div className="flex flex-col ">
                  <div className="flex flex-col sm:flex-row items-center"></div>
                  <div className="">
                    <form onSubmit={updateSubmit} encType="mutipart/form-data">
                      <div className="form">
                        <div className="mb-3">
                          <label className="text-lg font-semibold text-gray-600 py-2">
                            Profile Picture
                            <abbr className="hidden" title="required">
                              *
                            </abbr>
                          </label>
                          <div className="flex mt-3 lg:mt-0 items-center lg:py-3">
                            <div className="lg:w-20 lg:h-20 w-16 h-16 lg:mr-4 mr-3 flex-none rounded-full ring-2 ring-purple-800 border overflow-hidden">
                              {ImageData === null ? (
                                <img
                                  className="lg:w-20 lg:h-20 w-16 h-16 mr-4 object-cover"
                                  src={ProfileImg}
                                />
                              ) : (
                                <img
                                  className="lg:w-20 lg:h-20 w-16 h-16 mr-4 object-cover"
                                  // src={ImageData}
                                  src={`../../../public/profileImage/${ImageData}`}
                                />
                              )}
                            </div>
                            <label className="cursor-pointer">
                              <span className="focus:outline-none text-purple-900 font-medium text-lg py-2 px-3 lg:py-2 lg:px-4 rounded-lg bg-purple-300 hover:bg-purple-800 hover:text-white hover:shadow-lg ">
                                Browse
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                multiple="multiple"
                                accept="accept"
                                onChange={handleProfileImage}
                              />
                            </label>
                            <div className="lg:ml-10 space-y-2 w-full text-xs flex items-center justify-evenly">
                              <label className="font-semibold text-purple-900 lg:py-2 lg:px-5 px-2 lg:w-9/12 text-center">
                                <KeyboardDoubleArrowRightIcon fontSize="large" />
                              </label>
                              <div className="lg:w-20 lg:h-20 w-16 h-16 lg:mr-10 rounded-full ring-2 ring-purple-800 border overflow-hidden">
                                {ProfileImage === null ? (
                                  <img
                                    className="lg:w-20 lg:h-20 w-16 h-16 mr-4 object-cover"
                                    src={ProfileImg}
                                  />
                                ) : (
                                  <img
                                    className="lg:w-20 lg:h-20 w-16 h-16 mr-4 object-cover"
                                    src={ProfileImage}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="md:flex flex-row md:space-x-4 w-full text-xs mb-3">
                          <div className="mb-3 space-y-2 w-full text-xs">
                            <label className="font-semibold text-gray-600 py-2">
                              Display Name <abbr title="required">*</abbr>
                            </label>
                            <input
                              placeholder="Display Name"
                              className="appearance-none focus:border-0  block w-full bg-transparent text-grey-darker border-1 border-purple-800 rounded-lg h-10 px-4"
                              required="required"
                              type="text"
                              onChange={handleProfileName}
                              defaultValue={ProfileName}
                              name="integration[shop_name]"
                              id="integration_shop_name"
                            />
                          </div>
                          <div className="mb-3 space-y-2 w-full text-xs">
                            <label className="font-semibold text-gray-600 py-2">
                              Email ID
                            </label>
                            <input
                              readOnly
                              disabled
                              placeholder="Email ID"
                              className="appearance-none focus:border-0  block w-full bg-purple-300/50 text-grey-darker border-1 border-purple-800 rounded-lg h-10 px-4 "
                              type="text"
                              defaultValue={ProfileEmail}
                            />
                          </div>
                        </div>
                        <div className="flex-auto w-full mb-3 text-xs space-y-2">
                          <label className="font-semibold text-gray-600 py-2">
                            Bio
                          </label>
                          <textarea
                            required=""
                            name="message"
                            id=""
                            onChange={handleProfileBio}
                            defaultValue={ProfileBio}
                            className="focus:outline-none resize-none w-full min-h-[100px] max-h-[300px] h-28 appearance-none block bg-transparent text-grey-darker border-purple-800 rounded-lg  py-4 px-4 focus:border focus:border-purple-900"
                            placeholder="Describe Something About YourSelf "
                            spellCheck="false"
                            resize="noresize"
                          >
                            {/* {profile.bio} */}
                          </textarea>
                        </div>
                        <div className="mb-3 space-y-2 w-full text-xs">
                          <label className=" font-semibold text-gray-600 py-2">
                            RootX Username
                          </label>
                          <div className="flex flex-wrap items-stretch w-full mb-4 relative">
                            <div className="flex">
                              <span className="flex leading-normal rounded-r-none px-3 border-r-0 border border-purple-900 text-sm h-10 bg-purple-300 justify-center items-center rounded-lg font-medium text-purple-800">
                                https://rootx.com/
                              </span>
                            </div>
                            <input
                              type="text"
                              onChange={handleProfileUsername}
                              defaultValue={ProfileUsername}
                              className="flex-shrink flex-grow flex-auto leading-normal w-px border-l-0 h-10 border-purple-800  bg-transparent rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                              placeholder=""
                            />
                          </div>
                        </div>

                        <div className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                          <Link to="/dashboard">
                            <button className="mb-2 md:mb-0 text-red-800 font-medium text-sm py-2 px-4 rounded-lg w-full lg:w-min bg-red-300/70 hover:bg-red-700 hover:text-white hover:shadow-lg">
                              Cancel
                            </button>
                          </Link>

                          <button
                            type="submit"
                            className="mb-2 md:mb-0 text-purple-900 font-medium text-sm py-2 px-4 rounded-lg w-full lg:w-min bg-purple-300/90 hover:bg-purple-800 hover:text-white hover:shadow-lg"
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
        <div className="bg-[#ffffff80] rounded-lg p-3 mt-5 py-4">
          <button
            className="bg-red-800 rounded-lg  w-full lg:w-fit py-2 px-3 text-white"
            onClick={AddopenModal}
          >
            Delete Account
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={AddcloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    We WIll Miss You for Sure !
                  </Dialog.Title>
                  <hr />
                  <div className="mt-2">
                    <div className="flex">
                      <div className="w-full my-2">
                        <div>
                          <label className="py-2">
                            Please Type "{ProfileUsername}" to Confirm Account
                            Deletion
                          </label>
                          <input
                            type="text"
                            required
                            className="bg-transparent w-full rounded-lg border-2 border-purple-900 mb-2"
                            placeholder="Root Name"
                            onChange={deletefield}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center mx-2 border border-transparent text-black font-medium text-sm py-2 px-4 rounded-lg bg-gray-300 hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={AddcloseModal}
                    >
                      Cancel
                    </button>
                    {deleteCondition ? (
                      <button
                        onClick={deleteCreator}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Delete Account
                      </button>
                    ) : (
                      <button className="inline-flex justify-center rounded-md border border-transparent bg-red-700/10 px-4 py-2 text-sm font-medium text-white point pointer-events-none">
                        Delete Account
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
