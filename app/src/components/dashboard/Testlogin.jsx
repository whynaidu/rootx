import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/auth";

export const TestLogin = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  const auth = useAuth();

  // const redirectPath = location.state?.path || "/testProfile";

  const handleLogin = () => {
    auth.login(user);
    alert((auth.user))
    navigate('/testProfile');
  };
  return (
    <div>
      {console.log("hemkmal")}
      <label>
        Username:
        <input type="text" onChange={(e) => setUser(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
