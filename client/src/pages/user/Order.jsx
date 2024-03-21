
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Order = () => {
  return (
    <Layout>
      Order
      <div className="row m-2">
        <div className="col-3">
          <UserMenu />
        </div>
        <div className="col-7">Order</div>
      </div>
    </Layout>
  );
};

export default Order;
