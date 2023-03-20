





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../auth/auth";

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  //   const data = {
  //     token: ssotoken,
  //   };

  //   try {
  //     let resp = await axios.post(
  //       `http://localhost:3001/api/googlelogin`,
  //       data
  //     );
  //     if (resp.status === 200) {
  //       await auth.setUser(resp.data.user.creatoremail);
  //       await auth.setToken(data.token);
  //       console.log(auth)

        
  //     } else {
  //       if (resp.status === 401) {
  //         console.log(resp.data.message);
  //         toast.error(resp.data);
  //       }
  //     }
  //   } catch (err) {
  //     toast.error("Login Failed");
  //     console.log(err);
  //   }
  // };

  const handleCallbackResponse = async (response) => {
    const ssotoken = response.credential;
    const data = {
      token: ssotoken,
    };

    try {
      const resp = await axios.post(
        `http://localhost:3001/api/googlelogin`,
        data
      );

      if (resp.status === 200 && resp.data) {
        await auth.setUser(resp.data.user.creatoremail);
        await auth.setToken(data.token);
      } else {
        const errorMessage = resp.data ? resp.data : "Google login failed";
        toast.error(errorMessage);
      }
    } catch (err) {
      if (err.response.status === 401) {
        toast.error(err.response.data);
        setTimeout(() => {
        navigate("/signup");
        }, 1000);
      } else {
        toast.error("Login failed");
      }
      console.log(err);
    }
  };


async function loginUser(event) {
  event.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:3001/api/login",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.data;
    console.log(data);
    if (data.status === 401) {
            toast.error("Invalid login details.");

    }
    await auth.setUser(data.user.creatoremail);
    await auth.setToken(data.token);
  } catch (error) {
    if (error.response && error.response.status === 401 || 404) {
      toast.error("Invalid login details.");
    } else {
      toast.error("An error occurred while logging in.");
    }
  }
  }
  useEffect(() => {

    const google = window.google;
    google.accounts.id.initialize({
      client_id:
        "392108795050-28us09ng9mhp1c0kjnrrakju1loht2ea.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  },[])

useEffect(() => {
  if (auth.user && auth.token) {
    localStorage.setItem("Name", auth.user);
    localStorage.setItem("token", auth.token);
    toast.success("Login Successful");

    const DELAY_TIME_MS = 1800;
    setTimeout(() => {
      navigate("/dashboard");
    }, DELAY_TIME_MS);
  }
}, [auth.user, auth.token, navigate]);
  return (
    <>
      <div>
        <Toaster position="top-right" />
        <div className="loginPage justify-center w-full bg-cover h-[100vh] flex items-center">
          <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
            <div className="lg:px-6 px-2 text-gray-800">
              <div className="flex h-full items-center justify-center xl:justify-center">
                <div className="w-full">
                  <h1 className="text-center text-4xl font-medium my-5">
                    Login
                  </h1>

                  <div
                    id="signInDiv"
                    className="flex justify-center"
                    style={{ margin: "15px" }}
                  ></div>

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
                        <Link
                          to="/forgotPassword"
                          className="mt-6 text-purple-800 hover:text-black text-center"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div>
                        <p className="mt-2 mb-0 pt-3 text-md font-medium ">
                          Don't have an account?
                          <Link
                            to="/signup"
                            className="text-purple-800 hover:text-black"
                          >
                            <br />
                            Create Account
                          </Link>
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
