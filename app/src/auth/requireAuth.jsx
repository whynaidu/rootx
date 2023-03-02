import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const nameValue = localStorage.getItem("Name");

  if (!nameValue) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
