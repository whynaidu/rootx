import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AddNewLinkModal from "./AddNewLinkModal";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useEffect } from "react";
import NoImage from "../../assets/Untitled design (3).png";
import axios from "axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
export default function DashboardLinks({ LinksList }) {
  let [modalOpen, setIsOpenModal] = useState(false);
  let [LinkData, setLinkData] = useState([]);
  let [LinkDeleted, setLinkDeleted] = useState(false);
  let [rowId, setRowId] = useState(null)
  let [newLinkName, setnewLInkName] = useState("")
  let [newLinkURL, setnewLInkUrl] = useState("");
  // let [newLinkImage, setnewLInkImage] = useState("");
  let [newLinkVisiblity, setnewLInkVisbility] = useState();


  
  const [ModalData, setModalData] = useState([]);

  function closeModal() {
    setIsOpenModal(false);
  }

  function openUpdate(id) {
    setRowId(id)
    axios
      .get(`http://localhost:3001/api/getUserLinks/naiduvedant@gmail.com/${id}`)
      .then((response) => {
        setModalData(response.data[0].Link[0]);
        setnewLInkVisbility(response.data[0].Link[0].visible);
        setnewLInkName(response.data[0].Link[0].linkName);
        setnewLInkUrl(response.data[0].Link[0].linkUrl);

        openModal();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function linkUrlChange(e) {
    setnewLInkUrl(e.target.value);
  }

  function linkVisbilityChange(e) {
    setnewLInkVisbility(e);
  }
  function linkNameChange(e) {
   setnewLInkName(e.target.value);
  }

  function openModal() {
    setIsOpenModal(true);
  }

  async function updateclick(e) {
    e.preventDefault();
    const updateData = await axios
      .post(
        `http://localhost:3001/api/updateLink/naiduvedant@gmail.com/${rowId}`,
        {
          linkname:newLinkName,
          linkurl:newLinkURL,
          // linkimagename,
          Visible:newLinkVisiblity,
        }
      )
      .then((res) => {
        console.log("Updated");
      })
      .catch((err) => {});
    
  }

  
  useEffect(() => {
    setLinkData(LinksList);
  }, []);

  function deleteLink(id) {
    axios.post(
      `http://localhost:3001/api/deleteLink/naiduvedant@gmail.com/${id}`
    ) .then(res => {
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div>
      {console.log(newLinkVisiblity)}
      <div className="pb-2 text-xl flex justify-center">
        <h1 className="my-5 py-1 px-3 bg-purple-300 text-purple-800 rounded-md w-fit">
          Roots
        </h1>
      </div>
      <AddNewLinkModal />
      {LinkData.map((element, keys) => (
        <div
          className="flex w-full card px-1.5 py-1.5 items-center pr-4 hover:shadow-indigo-500/40 lg:max-w-full rounded-md"
          key={keys}
        >
          <div className="border-1 h-14 w-16 rounded-lg">
            {element.logo === "" ? (
              <img
                className="border h-[inherit] object-cover rounded-lg max-h-full w-[inherit]	"
                src={element.linkImagName}
              />
            ) : (
              <img
                className="h-[inherit] object-cover border-[3px] border-purple-800 rounded-lg max-h-full w-[inherit]	"
                src={NoImage}
              />
            )}
          </div>
          <div className="grid w-full space-y-2 text-center">
            <h3 className="text-1xl text-purple-800 font-semibold lg:text-2xl">
              {element.linkName}
            </h3>
          </div>
          <div>
            <div className="flex">
              <button
                type="button"
                className="mx-2 text-red-600 font-medium  hover:scale-[1.3]"
                onClick={closeModal}
              >
                <DeleteIcon onClick={() => deleteLink(element._id)} />
              </button>

              <EditIcon
                onClick={() => openUpdate(element._id)}
                className="cursor-pointer transition hover:ease-in-out delay-700 text-purple-800 hover:scale-[1.3] hover:text-purple-800 duration-800 "
              />
            </div>
          </div>
        </div>
      ))}

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
                  <form onSubmit={updateclick}>
                    <div className="mt-2">
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
                              onChange={linkNameChange}
                              defaultValue={ModalData.linkName}
                              className="bg-transparent w-full rounded-lg border-2 border-purple-900 mb-2"
                              placeholder="Root Name"
                            />
                          </div>

                          <div>
                            <label>Root Link</label>
                            <input
                              type="text"
                              onChange={linkUrlChange}
                              defaultValue={ModalData.linkUrl}
                              className="bg-transparent w-full rounded-lg border-2 border-purple-800"
                              placeholder="https://example.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      {ModalData.visible == true ? (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-purple-900 px-2 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => linkVisbilityChange(false)}
                        >
                          <VisibilityOffIcon />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-purple-900 px-2 py-2 text-sm font-medium text-purple-900 hover:bg-purple-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => linkVisbilityChange(true)}
                        >
                          <VisibilityIcon />
                        </button>
                      )}

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
    </div>
  );
}
