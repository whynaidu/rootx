import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ResetPassword() {
  const [tokenVerified, settokenVerified] = useState(false);
  const [newPassword, setnewPassword] = useState("");
  const [confirmnewPassword, setconfirmnewPassword] = useState("");
    const [passwordmatched, setpasswordmatched] = useState(false);


  const token = useParams();


  // function handlenewPassword(e) {
  //   setnewPassword(e.target.value);
  //   console.log(newPassword)
  // }

  function matchPassword(e) {
      
      
    }
  useEffect(() => {
    verifyToken();
  }, []);

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

  return (
    <div>
      {/* <Toaster position="top-right" /> */}
      <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
        <div className="bg-[#ffffff80]  lg:w-fill rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
          <div className="lg:px-6 px-2 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              {tokenVerified ? (
                <div className="w-full">
                  <h1 className="text-center lg:text-4xl  text-2xl font-medium my-5">
                    Create New Passord
                  </h1>

                  <form
                  // onSubmit={resetForm}
                  >
                    <div className="mb-3">
                      <label className="mb-4 text-xl">New Password</label>
                      <input
                        type="email"
                        className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                        placeholder="New Password"
                        onChange={(e)=> setnewPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="mb-4 text-xl">
                        Confirm New Password
                      </label>
                      <input
                        type="email"
                        className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                        placeholder=" Confirm New Password"
                        onChange={(e)=> setconfirmnewPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center lg:text-center">
                      <button
                        type="submit"
                        className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                      >
                        Update New Password
                      </button>
                      <div></div>
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
