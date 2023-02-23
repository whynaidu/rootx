import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
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

  function LoginSubmit(event) {
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
        <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
          <div className="lg:px-6 px-2 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              <div className="w-full">
                <h1 className="text-center text-3xl font-medium my-5">
                  Create an Account{" "}
                </h1>
                <form onSubmit={LoginSubmit}>
                  <div className="flex-wrap items-stretch w-full mb-4 relative">
                    <label className="mb-4 text-xl">Username</label>
                    <div className="flex mt-2">
                      <span className="flex leading-normal rounded-r-none py-3 lg:py-3 px-3 border-r-0 border border-purple-900 text-md  bg-purple-300 justify-center items-center rounded-lg font-bold text-purple-800 ">
                        https://rootx.com/
                      </span>
                      <input
                        type="text"
                        className="flex-grow flex-auto w-px border-l-0  border-purple-800  bg-transparent rounded-lg rounded-l-none relative focus:border-blue focus:shadow py-3 lg:py-3"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="mb-4 text-xl">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-3 lg:pr-4"
                      placeholder="Email"
                      onChange={onChangeEmail}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-4 text-xl">Password</label>
                    <input
                      type="password"
                      required
                      className="w-full  mt-2
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900  backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-3 lg:pr-4"
                      placeholder="Password"
                      onChange={onChangePassword}
                    />
                  </div>
                  <div className="mb-6">
                    <label className="mb-4 text-xl">Confirm Password</label>
                    <input
                      type="password"
                      required
                      className="w-full  mt-2
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900  backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-3 lg:pr-4"
                      placeholder="Confirm Password"
                      onChange={onChangePassword}
                    />
                  </div>

                  <div className="text-center lg:text-center">
                    <button
                      type="submit"
                      className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                    >
                      Signup
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
                        Already have an account?
                        <a
                          href="#!"
                          className="text-purple-800  text-lg font-bold hover:text-black"
                        >
                          <br />
                          Login
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
