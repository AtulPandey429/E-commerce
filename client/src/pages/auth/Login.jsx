import {  useState } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation, useNavigate } from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import "./Auth.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
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
        toast.success(response.data.message || "login ");
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
      <ToastContainer />
      <div className="container-fluid my-5 custom-container">
        <form
          onSubmit={handleSubmit}
          className="shadow p-4 bg-white rounded custom-form"
        >
          <h4 className="text-center font-weight-bold mb-4">Login</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              autoComplete="email" // Set to "email" for email suggestions
              name="loginEmail"
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

          <div className="row">
            <button type="submit" className="col m-2 rounded btn btn-primary">
              Login
            </button>
            <button
              type="submit"
              onClick={() => navigate("/forgotpassword")}
              className="col m-2 rounded btn btn-success"
            >
              Forgot password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
