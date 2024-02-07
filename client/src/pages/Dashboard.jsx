import React from "react";
import Layout from "../components/layout/Layout";
import UserMenue from "../components/layout/UserMenu";

const Dashboard = () => {
  return (
    <Layout title={"Dasboard"}>
      <div className="row">
        <div className="col">
          <UserMenue />
        </div>
        <div className="col"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
