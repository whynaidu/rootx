import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/auth";

export default function Greetings(props) {
  const auth = useAuth();
  const [greet, setGreet] = useState("");
  const name = props.userName;

  useEffect(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();
    var newGreet = "";

    if (hrs < 12) newGreet = "Good Morning";
    else if (hrs >= 12 && hrs <= 17) newGreet = "Good Afternoon";
    else if (hrs >= 17 && hrs <= 24) newGreet = "Good Evening";

    setGreet(newGreet);
  }, []);

  return (
    <div className="bg-[#ffffff80] rounded-lg w-full mt-8 p-4 drop-shadow-2xl text-purple-900">
      <h1 className="lg:text-xl text-lg">
        {greet} {name}
      </h1>
    </div>
  );
}
