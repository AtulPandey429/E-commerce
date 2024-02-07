import React from "react";
import { NavLink } from "react-router-dom";

const UserMenue = () => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item list-group-item-warning ">
          <NavLink
            to="/dashboard/user/profile"
            className="text-dark"
            style={{ textDecoration: "none", borderBottom: "0" }}
          >
            Profile
          </NavLink>
        </li>
        <li className="list-group-item list-group-item-primary ">
          <NavLink
            to="/dashboard/user/order"
            className="text-dark"
            style={{ textDecoration: "none", borderBottom: "0" }}
          >
            Order
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenue;
