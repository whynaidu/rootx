import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";

export default function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExist, setuserExist] = useState(false);
  const [emailExist, setemailExist] = useState(false);

  const [cpassword, setCPassword] = useState("");
  const [passwordMatch, setpasswordMatch] = useState(false);

  const url = "http://localhost:3001/api/adduser";

  function handleCPassword(e) {
    setCPassword(e.target.value);
  }

  const handleCallbackResponse = async (response) => {
    const ssotoken = response.credential;
    const data = {
      token: ssotoken,
    };

    try {
      let resp = await axios.post(
        `http://localhost:3001/api/googlesignup`,
        data
      );
      if (resp.status === 200) {
        await auth.setUser(resp.data.data.creatoremail);
      } else {
        if (resp.status === 403) {
          console.log(resp.data.message);

          // toast.error(resp.data);
        }
      }
    } catch (err) {
      toast.error("Already registered. Please login in!");
      console.log(err);
    }
  };
  
useEffect(() => {
  if (auth.user) {
    console.log(auth.user);
    localStorage.setItem("Name", auth.user);
    toast.success("Signup Successful");

    const DELAY_TIME_MS = 1800;
    setTimeout(() => {
      navigate("/dashboard");
    }, DELAY_TIME_MS);
  }
}, [auth.user, auth.token, navigate]);

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

    if (cpassword != password) {
      setpasswordMatch(false);
    } else {
      setpasswordMatch(true);
    }
  }, [handleCPassword]);

  async function chechUsername(e) {
    setUsername(e.target.value);
    console.log(e.target.value);
    const checkurl = `http://localhost:3001/${e.target.value}`;
    try {
      const response = await axios.get(checkurl);
      const data = response.data;
      console.log(data[0].creatoremail);
      setuserExist(true);
      // Do something with the response data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setuserExist(false);
      }
      console.error(error.response.data);
    }
  }

  async function chechEmail(e) {
    setEmail(e.target.value);
    console.log(e.target.value);

    const checkEmailurl = `http://localhost:3001/creator/${e.target.value}`;

    try {
      const response = await axios.get(checkEmailurl);
      const data = response.data;

      if (data[0] && data[0].creatoremail === e.target.value) {
        setemailExist(true);
        // Do something with the response data
      } else {
        setemailExist(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setemailExist(false);
      }
      console.error(error.response);
    }
  }

  async function SigninSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        username: username,
        password: cpassword,
        creatoremail: email,
      });
      toast.success("SignUp Sucessfull");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log(response);

      // Handle response here
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  }

  return (
    <div>
      <Toaster position="top-right" />

      <div className="py-16 loginPage justify-center w-full bg-cover flex items-center">
        <div className="bg-[#ffffff80]  lg:w-1/3 rounded-xl m-4 p-6 mt-auto mb-auto shadow-lg">
          <div className="lg:px-6 px-2 text-gray-800">
            <div className="flex h-full items-center justify-center xl:justify-center">
              <div className="w-full">
                <h1 className="text-center text-3xl font-medium my-5">
                  Create an Account{" "}
                </h1>
                <div
                  id="signInDiv"
                  className="flex justify-center"
                  style={{ margin: "15px" }}
                ></div>
               <p className="w-full text-center">OR</p> 
                <form onSubmit={SigninSubmit}>
                  <div className="flex-wrap items-stretch w-full mb-4 relative">
                    <label className="mb-4 text-xl">Username</label>
                    <div className="flex mt-2">
                      <span className="flex leading-normal rounded-r-none py-3 lg:py-3 px-3 border-r-0 border border-purple-900 text-md  bg-purple-300 justify-center items-center rounded-lg font-bold text-purple-800 ">
                        https://rootx.com/
                      </span>
                      <input
                        type="text"
                        required
                        className="flex-grow flex-auto w-px border-l-0  border-purple-800  bg-transparent rounded-lg rounded-l-none relative focus:border-blue focus:shadow py-3 lg:py-3"
                        placeholder=""
                        onBlur={chechUsername}
                      />
                    </div>
                    {username &&
                      (userExist === true ? (
                        <p className="text-red-500">User Found</p>
                      ) : (
                        <p className="text-green-500">Username Available</p>
                      ))}
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
                      onBlur={chechEmail}
                    />
                    {email &&
                      (emailExist === true ? (
                        <p className="text-red-500">Email Found</p>
                      ) : (
                        <p className="text-green-500">Email Available</p>
                      ))}{" "}
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
                      onChange={(e) => setPassword(e.target.value)}
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
                      onChange={handleCPassword}
                    />

                    {cpassword &&
                      (passwordMatch === true ? (
                        <p className="text-green-500">Password matched</p>
                      ) : (
                        <p className="text-red-500">Password not matched</p>
                      ))}
                  </div>

                  <div className="text-center lg:text-center">
                    {!userExist && passwordMatch ? (
                      <button
                        type="submit"
                        className="w-fit rounded-xl border-0 bg-purple-300 text-purple-800 py-2 px-5 text-center hover:bg-purple-800 hover:text-white font-bold"
                      >
                        Signup
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="w-fit rounded-xl border-0 bg-purple-200 text-purple-300 py-2 px-5 text-center cursor-auto"
                      >
                        Signup
                      </button>
                    )}
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
                        <Link
                          to="/login"
                          className="text-purple-800  text-lg font-bold hover:text-black"
                        >
                          <br />
                          Login
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
  );
}
