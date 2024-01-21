import { React, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7070/api/v1/auth/login",
        { email, password }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
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
