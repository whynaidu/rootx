import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast, { Toaster } from "react-hot-toast";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ShareIcon from "@mui/icons-material/Share";
import logo from "../../assets/react.svg";
import { FiMail } from "react-icons/fi";

import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaFacebookMessenger,
} from "react-icons/fa";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { Link } from "react-router-dom";
export default function Tools(props) {
  let [modalOpen, setIsOpenModal] = useState(false);
  let [sharemodalOpen, setIsshareOpenModal] = useState(false);

  let [Tools, setTools] = useState({});
  useEffect(() => {
    setTools(props.ToolData);
  });

  function closeModal() {
    setIsOpenModal(false);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  function sharecloseModal() {
    setIsshareOpenModal(false);
  }

  function shareopenModal() {
    setIsshareOpenModal(true);
  }

  const copy = async () => {
    await navigator.clipboard.writeText(`http://localhost:5173/${Tools}`);
    toast.success("Url Copied!");
  };
  function openUrl() {
    window.open(`http://localhost:5173/${Tools}`, "_blank");
  }

  const handleDownload = () => {
    html2canvas(document.querySelector("#QRCode"), {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "react-qrcode-logo.png";
      link.href = canvas.toDataURL();
      useCORS: true;

      link.click();
    });
  };

  return (
    <div>
      <Toaster position="top-right" className="bg-[#ffffff80] " />
      <div className="lg:flex grid gap-2 grid-cols-2">
        <Link to={`/${Tools}`}>
          <button
            className="px-5 py-2.5 relative rounded lg:w-44 w-full  group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block hover:bg-purple-800 hover:text-purple-200 drop-shadow-2xl"
            // onClick={openUrl}
          >
            <span className="relative">
              <VisibilityIcon />
              &nbsp; Preview
            </span>
          </button>
        </Link>

        <button
          className="px-5 py-2.5 relative rounded  w-full group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block hover:bg-purple-800 hover:text-purple-200 drop-shadow-2xl"
          onClick={copy}
        >
          <span className="relative">
            <ContentCopyIcon />
            &nbsp; Copy Link
          </span>
        </button>

        <button
          className="px-5 py-2.5 relative rounded  w-full group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block hover:bg-purple-800 hover:text-purple-200 drop-shadow-2xl"
          onClick={openModal}
        >
          <span className="relative">
            <QrCodeIcon />
            &nbsp; QR Code
          </span>
        </button>

        <button
          className="px-5 py-2.5 relative rounded  w-full group overflow-hidden font-medium backdrop-blur-xl bg-[#ffffff80] text-purple-800 inline-block hover:bg-purple-800 hover:text-purple-200 drop-shadow-2xl"
          onClick={shareopenModal}
        >
          <span className="relative text-sm lg:text-md">
            <ShareIcon />
            &nbsp; Social Share
          </span>
        </button>
      </div>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white lg:p-5 p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    @{Tools} QR Code
                  </Dialog.Title>
                  <hr />
                  <div className="mt-2">
                    <div className="flex px-6 justify-center">
                      <QRCode
                        id="QRCode"
                        quietZone={15}
                        title={`${Tools}`}
                        size={256}
                        level="H"
                        logoImage={logo}
                        fgColor="#7032a2"
                        removeQrCodeBehindLogo={true}
                        logoPaddingStyle="circle"
                        eyeRadius={[
                          {
                            // top/left eye
                            outer: [10, 10, 0, 10],
                            inner: [10, 10, 0, 10],
                          },
                          [10, 10, 10, 0], // top/right eye
                          [10, 0, 10, 10], // bottom/left
                        ]}
                        value={`http://localhost:5173/${Tools}`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center  mx-2 border border-transparent text-black font-medium text-sm py-2 px-4 rounded-lg bg-gray-300 hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center items-center  rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDownload}
                    >
                      Download QR Code
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={sharemodalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={sharecloseModal}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white lg:p-5 p-4 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Share on
                  </Dialog.Title>
                  <hr />
                  <div className="mt-2">
                    <div className="lg:p-4 p-2 lg:gap-6 gap-4 grid grid-cols-3 text-purple-800">
                      <div className=" flex justify-center">
                        {/* <a
                          href={`https://wa.me/send?text=HI've just updated my Rootx with my latest content - check it out here! http://localhost:5173/${Tools}`}
                        > */}

                        <WhatsappShareButton
                          url={`http://localhost:5173/${Tools}`}
                          title="HI've just updated my Rootx with my latest content - check it out here!"
                          separator="  "
                        >
                          <FaWhatsapp className="lg:text-8xl text-4xl m-3" />
                        </WhatsappShareButton>
                        {/* </a> */}
                      </div>
                      <div className=" flex justify-center">
                        <LinkedinShareButton
                          url={`http://localhost:5173/${Tools}`}
                        >
                          <FaLinkedin className="lg:text-8xl  text-4xl m-3" />
                        </LinkedinShareButton>
                      </div>
                      <div className=" flex justify-center">
                        {/* <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:5173/${Tools}`}
                          target="_blank"
                        > */}
                        <FacebookShareButton
                          url={`http://localhost:5173/${Tools}`}
                          quote="adsdsd"
                          className="Demo__some-network__share-button"
                        >
                          <FaFacebook className="lg:text-8xl  text-4xl m-3" />
                        </FacebookShareButton>

                        {/* </a> */}
                      </div>

                      <div className=" flex justify-center">
                        <TwitterShareButton
                          url={`http://localhost:5173/${Tools}`}
                          title="HI've just updated my Rootx with my latest content - check it out here!"
                        >
                          <FaTwitter className="lg:text-8xl text-4xl " />
                        </TwitterShareButton>
                      </div>
                      <div className=" flex justify-center">
                        <FacebookMessengerShareButton
                          url={`http://localhost:5173/${Tools}`}
                          appId="521270401588372"
                        >
                          <FaFacebookMessenger className="lg:text-8xl text-4xl " />
                        </FacebookMessengerShareButton>
                      </div>
                      <div className=" flex justify-center">
                        <EmailShareButton
                          url={`http://localhost:5173/${Tools}`}
                          title="HI've just updated my Rootx with my latest content - check it out here!"
                          body="body"
                          className="Demo__some-network__share-button"
                        >
                          <FiMail className="lg:text-8xl text-4xl " />
                        </EmailShareButton>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center items-center  mx-2 border border-transparent text-black font-medium text-sm py-2 px-4 rounded-lg bg-gray-300 hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={sharecloseModal}
                    >
                      Close
                    </button>
                    {/* <button
                      type="submit"
                      className="inline-flex justify-center items-center  rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDownload}
                    >
                      Download QR Code
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
