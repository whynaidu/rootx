import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik"
import { Toaster } from 'react-hot-toast';
// import { loginvalidate } from "../../helper/validate";


export default function Login() {
    const navigate = useNavigate();

  	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  // let [Email, setEmail] = useState("");

  // let [password, setPassword] = useState("");

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validate: loginvalidate,
  //   // validate: passwordvalidate,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit: async (values) => {
  //     console.log(values);
  //   },
  // });

  async function loginUser(event) {
    event.preventDefault();
  const response = await axios.post(
    "http://localhost:3001/api/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

    const data = await response.data;

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      navigate("/dashboard");
    } else {
      alert("Please check your username and password");
    }
  }



  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
        <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
          <div className="lg:px-6 px-2 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              <div className="w-full">
                <h1 className="text-center text-4xl font-medium my-5">Login</h1>
                <form onSubmit={loginUser}>
                  <div className="mb-3">
                    <label className="mb-4 text-xl">Email</label>
                    <input
                      type="email"
                      className="w-full mt-2 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900 backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}

                      // {...formik.getFieldProps("email")}
                      // onChange={onChangeEmail}
                    />
                  </div>

                  <div className="mb-6">
                    <label className="mb-4 text-xl">Password</label>
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      // {...formik.getFieldProps("password")}
                      className="w-full 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900  backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                      placeholder="Password"
                      // onChange={onChangePassword}
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
