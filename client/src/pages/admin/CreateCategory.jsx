import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
// import { useAuth } from '../../context/AuthContext'

const CreateCategory = () => {
  return (
    <Layout title={"admin-CreateCategory"}>
      <div className="row m-2 ">
        <div className="col-2">
          <AdminMenu />
        </div>
        <div className="col-8">category</div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
