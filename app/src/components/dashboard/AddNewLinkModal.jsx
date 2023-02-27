import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { Toaster } from "react-hot-toast";

export default function AddNewLinkModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [file, setfile] = useState(null);
  const [RootName, setRootName] = useState("");
  const [RootUrl, setRootUrl] = useState("");
  const [RootImage, setRootImage] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleRootName(click) {
    setRootName(click.target.value);
  }
  function handleRootUrl(click) {
    setRootUrl(click.target.value);
  }

  function handleRootImage(click) {
    setRootImage(click.target.files[0]);
    setfile(URL.createObjectURL(click.target.files[0]));
  }

  async function AddRoot(click) {
    click.preventDefault();
    const formData = new FormData();
    //  formData.append("linkImagName", RootImage);
    formData.append("linkname", RootName);
    formData.append("linkurl", RootUrl);
    const addLink = await axios
      .post(`http://localhost:3001/api/addlink`, {
        linkname: RootName,
        linkurl: RootUrl
  
      })
      .then((res) => {
        console.log(res);
        setIsOpen(false)
        toast.success(res.data);
      })
      .catch((err) => {
        //  toast.error(err);
        console.log(res.data);
      });
  }

  return (
    <>
      <Toaster position="top-center"/>
      <div className=" inset-0  flex">
        <div>
          <button
            className="relative inline-flex items-center justify-center px-7 py-2 backdrop-blur-xl bg-purple-300/60 overflow-hidden font-medium text-purple-800 transition duration-300 ease-out rounded-md shadow-md group"
            onClick={openModal}
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-800 group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-purple-800 transition-all duration-300 transform group-hover:translate-x-full ease">
              <AddIcon fontSize="medium" />
              &nbsp;New Root
            </span>
            <span className="relative invisible">New Root</span>
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add New Root
                  </Dialog.Title>
                  <hr />
                  <form onSubmit={AddRoot}>
                    <div className="mt-2">
                      <div className="flex">
                        <div className="w-1/2">
                          <div className="flex items-center justify-center h-full w-full">
                            <label className="cursor-pointer h-full w-full lg:mr-4 mr-3">
                              <span className="flex items-center justify-center border-2 border-purple-800 h-full focus:outline-none text-purple-900 font-medium lg:text-md text-xs py-2 px-2 lg:py-2 lg:px-9  rounded-xl bg-purple-300 hover:bg-purple-800 hover:text-white hover:shadow-lg ">
                                <div className="text-center">
                                  <InsertPhotoIcon fontSize="large" />
                                  <br />
                                  Select Image
                                </div>
                              </span>

                              <input
                                type="file"
                                className="hidden"
                                onChange={handleRootImage}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="w-full">
                          <div>
                            <label>Root Name</label>
                            <input
                              type="text"
                              className="bg-transparent w-full rounded-lg border-2 border-purple-900 mb-2"
                              placeholder="Root Name"
                              onChange={handleRootName}
                            />
                          </div>

                          <div>
                            <label>Root Link</label>
                            <input
                              type="text"
                              className="bg-transparent w-full rounded-lg border-2 border-purple-800"
                              placeholder="https://example.com"
                              onChange={handleRootUrl}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center mx-2 border border-transparent text-black font-medium text-sm py-2 px-4 rounded-lg bg-gray-300 hover:bg-red-700 hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Add Root
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
