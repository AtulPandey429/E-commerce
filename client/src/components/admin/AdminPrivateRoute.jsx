import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./../spinner/Spinner";

const  AdminPrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useAuth();

  const checkAuthentication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7070/api/v1/auth/admin-auth"
      );
      const isOk = response.data.ok;
      setIsAuthenticated(isOk);
    } catch (error) {
      console.error("Error during authentication check:", error);
      // Handle the error, e.g., redirect to an error page
    }
  };

  useEffect(() => {
    if (auth?.token) {
      checkAuthentication();
    }
  }, [auth?.token]);

  return isAuthenticated ? <Outlet /> : <Spinner path="/" />;
};

export default  AdminPrivateRoute;
