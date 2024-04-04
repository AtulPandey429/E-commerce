import React from "react";
import { useAuth } from "../../context/AuthContext";
import UserMenue from "../../components/layout/UserMenu";

const UserProfileDashboard = () => {
  const [auth] = useAuth();
  
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-3">
          <UserMenue />
        </div>
        <div className="col-9">
          <h2 className="mb-4">Welcome, {auth.user.name.toUpperCase()}!</h2>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Profile</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Name:</strong> {auth.user.name}</li>
                <li className="list-group-item"><strong>Email:</strong> {auth.user.email}</li>
                <li className="list-group-item"><strong>Address:</strong> {auth.user.address}</li>
                <li className="list-group-item"><strong>Mobile:</strong> {auth.user.mobile}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDashboard;