import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../auth/auth";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setauthenticated] = useState("");


  async function loginUser(event) {
    console.log("my all state", email, password);
    console.log("my context api 1", authenticated);
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
    await auth.setUser(data.user.creatoremail);
    await auth.setToken(data.token);
  }
  useEffect(() => {
  if (auth.user && auth.token) {
    localStorage.setItem("Name", auth.user);
    localStorage.setItem("token", auth.token);
    setauthenticated(auth.user);
    navigate("/dashboard");
  }

  
}, [auth.user, navigate]);
  return (
    <>
      {console.log(authenticated)}
      <div>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
          <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
            <div className="lg:px-6 px-2 text-gray-800">
              <div className="flex h-full items-center justify-center xl:justify-center">
                <div className="w-full">
                  <h1 className="text-center text-4xl font-medium my-5">
                    Login
                  </h1>
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
                      />
                    </div>

                    <div className="mb-6">
                      <label className="mb-4 text-xl">Password</label>
                      <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full 
                    rounded-lg border-1 border-purple-800 bg-transparent leading-none text-purple-900  backdrop-blur-lg 
                    transition-colors duration-200 focus:outline-none 
                    md:py-4 md:pr-4 lg:py-4 lg:pr-4"
                        placeholder="Password"
                      />
                    </div>

                    <div className="text-center lg:text-center">
                      <button
                        // type="submit"
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
    </>
  );
}
