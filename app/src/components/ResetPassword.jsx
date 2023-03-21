import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [tokenVerified, settokenVerified] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [confirmnewPassword, setconfirmnewPassword] = useState("");
  const [passwordmatched, setpasswordmatched] = useState(false);
  const navigate = useNavigate();

  const token = useParams();

  function handeleConfirmnewPassword(e) {
    setconfirmnewPassword(e.target.value);
  }

  function handlenewPassword(e) {
    setnewPassword(e.target.value);
  }

  useEffect(() => {
    if (newPassword === "" && confirmnewPassword === "") {
      setpasswordmatched(false);
    }

    if (newPassword === confirmnewPassword) {
      setpasswordmatched(true);
    } else {
      setpasswordmatched(false);
    }
  }, [newPassword, confirmnewPassword]);

  useEffect(() => {
    if (newPassword === "" && confirmnewPassword === "") {
      setpasswordmatched(false);
    }
    verifyToken();
  }, []);

  const resetForm = async (e) => {
    e.preventDefault();
    const data = await axios.post("");
  };

  const verifyToken = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/verifyToken/${token.token}`
      );

      // Handle the response
      if (response.status === 200) {
        // Token is valid, do something
        settokenVerified(true);
        console.log("Token is valid");
      } else {
        // Token is invalid, do something
        console.log("Token is invalid");
      }
    } catch (error) {
      // Handle errors
      console.error("Error verifying token:", error);
    }
  };

  const ResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3001/api/resetPassword/${token.token}`,
        {
          confirmPassword: confirmnewPassword,
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        toast.success(res.data);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="top-right" />
      <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
        <div className="bg-[#ffffff80]  lg:w-fill rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
          <div className="lg:px-6 px-2 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              {tokenVerified ? (
                <div className="w-full">
                  <h1 className="text-center lg:text-4xl  text-2xl font-medium my-5">
                    Create New Passord
                  </h1>

                  <form onSubmit={ResetPassword}>
                    <div className="mb-3">
                      <label className="mb-4 text-xl">New Password</label>
                      <input
                        type="password"
                        required
                        className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                        placeholder="New Password"
                        onChange={handlenewPassword}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="mb-4 text-xl">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                        placeholder=" Confirm New Password"
                        onChange={handeleConfirmnewPassword}
                      />
                    </div>

                    <div className="text-center lg:text-center">
                      {passwordmatched ? (
                        <button
                          type="submit"
                          className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                        >
                          Update New Password
                        </button>
                      ) : (
                        <div>
                          <button
                            type="button"
                            className="w-fit rounded-xl border-0 bg-purple-200 text-purple-300 py-2 px-5 text-center font-bold cursor-not-allowed"
                          >
                            Update New Password
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <div>
                  <h1>Please Wait Verifing</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
