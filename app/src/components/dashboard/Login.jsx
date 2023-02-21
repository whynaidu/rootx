import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login() {

  let [Email, setEmail] = useState("");

  let [password, setPassword] = useState("");
  
  const navigate = useNavigate();

   const onChangeEmail = (e) => {
     const email = e.target.value;
      setEmail(email);
   };

   const onChangePassword = (e) => {
     const password = e.target.value;
     setPassword(password);
   };


  function LoginSubmit(event)
  {
    // alert("dsfsdf")
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", Email);
    formData.append("password", password);
    // axios
    //   .post(`http://localhost:3001/upload/`, formData)
    //   .then((res) => {
        
    //   })
    //   .catch((err) => {
    //     console.log(res.data);
    //   });
    }

  return (
    <div>
      <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
        <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto border border-purple-800 shadow-xl">
          <div className="px-6 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              <div className="w-full">
                <h1 className="text-center text-4xl font-medium my-5">Login</h1>
                <form onSubmit={LoginSubmit}>
                  <div className="mb-3">
                    <label className="mb-4 text-xl">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                      placeholder="Email"
                      onChange={onChangeEmail}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-4 text-xl">Password</label>
                    <input
                      type="password"
                      required
                      className="w-full 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900  backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                      placeholder="Password"
                      onChange={onChangePassword}
                    />
                  </div>

                  <div className="text-center lg:text-center">
                    <button
                      type="submit"
                      className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                    >
                      Login
                    </button>

                    <div className="flex items-end lg:justify-end justify-center">
                      <a
                        href="#!"
                        className="mt-6 text-purple-800 hover:text-black text-center"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div>
                      <p className="mt-2 mb-0 pt-3 text-md font-medium ">
                        Don't have an account?
                        <a
                          href="#!"
                          className="text-purple-800 hover:text-black"
                        >
                          <br />
                          Create Account
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
