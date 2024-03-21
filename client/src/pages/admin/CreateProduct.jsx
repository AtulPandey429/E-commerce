
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";

const CreateProduct = () => {
  return (
    <Layout title={"Admin-CreateProduct"}>
      <div className="row m-2">
        <div className="col-2">
          <AdminMenu />
        </div>
        <div className="col-8">CreateProduct</div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
