import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/auth";

export const TestProfile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
    navigate("/dashboard");
  };
  return (
    <div>
      Welcome {auth.user}.<button onClick={handleLogout}>Logout</button>
    </div>
  );
}