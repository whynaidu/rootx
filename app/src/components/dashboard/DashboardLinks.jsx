import React from 'react'
import EditIcon from "@mui/icons-material/Edit";
import AddNewLinkModal from "./AddNewLinkModal"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";


export default function DashboardLinks() {
    let [modalOpen, setIsOpenModal] = useState(false);

    function closeModal() {
      setIsOpenModal(false);
    }

    function openModal() {
      setIsOpenModal(true);
  }
  ;

  function alertwarning(){
    alert("hiii");

  }

  return (
    <div>
      <div className="pb-2 text-xl flex justify-center">
        <h1 className="my-5 py-1 px-3 bg-purple-300 text-purple-800 rounded-md w-fit">
          Roots
        </h1>
      </div>
      <AddNewLinkModal />
      <div className="flex w-full card px-1.5 py-1.5 items-center pr-4 hover:shadow-indigo-500/40 lg:max-w-full rounded-md">
        <div className="border-1 h-14 w-16 rounded-lg">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]	"
          />
        </div>
        <div className="grid w-full space-y-2 text-center">
          <h3 className="text-1xl text-purple-800 font-semibold lg:text-2xl">
            Hiii
          </h3>
        </div>
        <div>
          <EditIcon
            onClick={openModal}
            className="cursor-pointer transition hover:ease-in-out delay-700 text-purple-800 hover:scale-[1.3] hover:text-purple-800 duration-800 "
          />
        </div>
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
                    Edit Root
                  </Dialog.Title>
                  <hr />
                  <div className="mt-2">
                    <form>
                      <div className="flex">
                        <div className="w-1/2">
                          <div className="flex items-center justify-center h-full w-full">
                            <label className="cursor-pointer h-full w-full lg:mr-4 mr-3">
                              <span className="flex items-center justify-center border-2 border-purple-800 h-full focus:outline-none text-purple-900 font-medium lg:text-md text-xs py-2 px-2 lg:py-2 lg:px-9  rounded-xl bg-purple-300 hover:bg-purple-800 hover:text-white hover:shadow-lg ">
                                <div className="text-center">
                                  <InsertPhotoIcon fontSize="large" />
                                  <br />
                                  Change Image
                                </div>
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                multiple="multiple"
                                accept="accept"
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
                            />
                          </div>

                          <div>
                            <label>Root Link</label>
                            <input
                              type="text"
                              className="bg-transparent w-full rounded-lg border-2 border-purple-800"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center mx-2 border-2 border-red-600 text-red-800 font-medium text-sm py-2 px-2 rounded-lg  hover:bg-red-600 hover:text-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <DeleteIcon/>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-purple-900 px-2 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
<VisibilityOffIcon/>
                    </button>
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
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-300 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Add Root
                    </button>
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
