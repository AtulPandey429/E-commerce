import { React, useState } from "react";
import Layout from "../../components/layout/Layout";;
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7070/api/v1/auth/register",
        { name, email, password, address, mobile }
      );

      if (response.data.success) {
        toast.success("response.data.message");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
      console.error(error); // Log for debugging
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center ">Register</h2>
          <div className="mb-3">
            <input
              required
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={name}
            />
          </div>
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
          <div className="mb-3">
            <input
              required
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              type="text"
              className="form-control"
              value={mobile}
            />
          </div>
          <div className="mb-3">
            <input
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              type="text"
              className="form-control"
              value={address}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
