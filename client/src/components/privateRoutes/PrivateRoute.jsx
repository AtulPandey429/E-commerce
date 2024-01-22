import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "./../spinner/Spinner";

const PrivateRoute = () => {
  const [ok, setok] = useState(false);
  const [auth, setauth] = useAuth();
  useEffect(() => {
    const authcheck = async () => {
      const res = await axios.get(
        "http://localhost:7070/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };
    if (auth?.token) authcheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
