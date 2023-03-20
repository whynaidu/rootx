import React, { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import { CgPassword } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuth } from "../../auth/auth";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  useEffect(() => {
    const tokenValue = localStorage.getItem("Name");
    if (tokenValue) {
      auth.setUser(tokenValue);
    }
  }, []);

  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      currentPassword: currentPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/api/changePassword/${auth.user}`,
        formData
      );
      toast.success(response.data);
          event.target.reset();

    } catch (error) {
      if (error.response.status === 406) {
        setError("Unauthorized");
        toast.error(error.response.data);
      } else {
        setError("Password change failed");
      }
    }
  };
  return (
    <div>
      <Toaster position="top-right" />
      <PageHeader Icon={<CgPassword />} title={"Change Password"} />
      <div className="bg-[#ffffff80] rounded-lg py-6 px-5 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="w-full text-xs mb-3">
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  Current Password <abbr title="required">*</abbr>
                </label>
                <input
                  placeholder="Current Password"
                  className="appearance-none focus:border-0  block w-full bg-transparent text-grey-darker border-1 border-purple-800 rounded-lg h-10 px-4"
                  required="required"
                  type="text"
                  onChange={handleCurrentPasswordChange}
                />
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  New Password
                </label>
                <input
                  placeholder="New Password"
                  className="appearance-none focus:border-0  block w-full bg-transparent text-grey-darker border-1 border-purple-800 rounded-lg h-10 px-4"
                  required="required"
                  type="text"
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className="mb-3 space-y-2 w-full text-xs">
                <label className="font-semibold text-gray-600 py-2">
                  Confirm New Password
                </label>
                <input
                  placeholder="Confirm New Password"
                  className="appearance-none focus:border-0  block w-full bg-transparent text-grey-darker border-1 border-purple-800 rounded-lg h-10 px-4"
                  required="required"
                  type="text"
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>

            <div className="mt-5 text-right md:space-x-3 md:block flex flex-reverse justify-around">
              <Link to="/dashboard">
                <button className="mb-2 md:mb-0 text-red-800 font-medium text-sm py-2 px-4 rounded-lg w-fit lg:w-min bg-red-300/70 hover:bg-red-700 hover:text-white hover:shadow-lg">
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="mb-2 md:mb-0 text-purple-900 font-medium text-sm py-2 px-4 rounded-lg w-max lg:w-fit bg-purple-300/90 hover:bg-purple-800 hover:text-white hover:shadow-lg"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
