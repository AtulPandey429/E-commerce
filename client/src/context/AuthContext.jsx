// AuthContext.js
import axios from "axios";
import  { createContext, useContext, useEffect, useState } from "react";

const AuthCreateContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // header
  axios.defaults.headers.common["Authorization"] = auth?.token;
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthCreateContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthCreateContext.Provider>
  );
};

// useAuth should be used within a functional component
const useAuth = () => {
  const contextValue = useContext(AuthCreateContext);

  if (!contextValue) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return contextValue;
};

export { useAuth, AuthContextProvider };
