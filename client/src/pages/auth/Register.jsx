// Import necessary libraries and components
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";

// Define the Register component
const Register = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the registration endpoint
      const res = await axios.post(
        "http://localhost:7070/api/v1/auth/register",
        { name, email, password, address, mobile }
      );

      // Check the response and take appropriate action
      if (res.data.success) {
        navigate("/login"); // Navigate to login page on success
        toast.success("successfully created"); // Display success toast
      } else {
        toast.error(res.data.message); // Display error toast
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  // Return the JSX for the Register component
  return (
    <Layout title={"Register"}>
      {/* Layout wrapper */}
      <div className="register">
        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Register</h2>

          {/* Name input */}
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

          {/* Email input */}
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

          {/* Password input */}
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

          {/* Mobile input */}
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

          {/* Address input */}
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

          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

// Export the Register component
export default Register;
