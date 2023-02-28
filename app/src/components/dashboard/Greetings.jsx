import React from "react";
import { useAuth } from "../../auth/auth";

export default function Greetings(props) {
  const auth = useAuth();


  return (
    <div className="bg-[#ffffff80] rounded-lg w-full mt-8 p-4 drop-shadow-2xl text-purple-900">
      <h1 className="text-xl">Good Morning {props.userName}</h1>
    </div>
  );
}
