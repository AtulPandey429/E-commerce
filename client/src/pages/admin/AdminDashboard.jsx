import React from "react";
import Layout from "../../components/layout/Layout.jsx";
import AdminMenu from "../../components/layout/AdminMenu.jsx";

const AdminDashboard = () => {
  return (
    <Layout title={"AdminDashboard"}>
     
    <div className="row">
      <h3 className="row m-2"> AdminDashboard</h3>
      <div className="col-3 m-2"><AdminMenu/></div>
      <div className="col-6">content</div>
    </div>

    </Layout>
  );
};

export default AdminDashboard;
