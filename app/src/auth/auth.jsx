import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);


  const login = (user) => {
    setUser(user);
  };


  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
