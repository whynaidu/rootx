import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

import { BsPatchCheckFill } from "react-icons/bs";

export default function ForgotPassword() {
  const [email, setemail] = useState("");
  const [emailSent, setemailSent] = useState(false);

  function handleEmail(e) {
    setemail(e.target.value);
  }

  const submitform = async (e) => {
    e.preventDefault();
    try {
      let resp = await axios.post(`http://localhost:3001/api/forgot`, {
        email: email,
      });
      toast.success(resp.data);
      setemailSent(true);
    } catch (error) {
      if (error.response.status === 501) {
        toast.error(error.response.data);
      }
    }
  };

  return (
    <div>
      <div>
        {console.log(email)}
        <Toaster position="top-right" />
        <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
          <div className="bg-[#ffffff80]  lg:w-fill rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
            <div className="lg:px-6 px-2 text-gray-800">
              <div className="flex h-full items-center justify-center xl:justify-center">
                {emailSent ? (
                  <div className="">
                    <div className="flex justify-center">
                      <BsPatchCheckFill className="text-6xl text-purple-800 " />
                    </div>

                    <h1 className="text-xl lg:text-4xl w-full grid place-content-center my-2">
                      Email Sent SuccesFully
                    </h1>

                    <p className="w-full text-sm lg:text-xl my-6">
                      Please Check Your Email for Further Process
                    </p>
                  </div>
                ) : (
                  // <p>Please Check Your Email for Further Process</p>
                  <div className="w-full">
                    <h1 className="text-center lg:text-4xl  text-2xl font-medium my-5">
                      Forgot Passord
                    </h1>

                    <form onSubmit={submitform}>
                      <div className="mb-3">
                        <label className="mb-4 text-xl">Email</label>
                        <input
                          type="email"
                          className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                          placeholder="Email"
                          onChange={handleEmail}
                        />
                      </div>

                      <div className="text-center lg:text-center">
                        <button
                          type="submit"
                          className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                        >
                          Submit
                        </button>

                        <div>
                          <p className="mt-2 mb-0 pt-3 text-md font-medium ">
                            Back to
                            <Link
                              to="/login"
                              className="text-purple-800 hover:text-black"
                            >
                              <br />
                              Login
                            </Link>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
