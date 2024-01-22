import { React, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setauth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7070/api/v1/auth/login",
        { email, password }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setauth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.log(error); // Log for debugging
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center ">Login</h2>

          <div className="mb-3">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="form-control"
              value={email}
            />
          </div>
          <div className="mb-3">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              className="form-control"
              value={password}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
