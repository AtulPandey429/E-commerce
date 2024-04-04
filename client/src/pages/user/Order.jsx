import React from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";

const Order = () => {
  return (
    <Layout>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>Order History</h3>
            <div className="card">
              <div className="card-body">
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Order ID: 123456
                    <span className="badge bg-primary rounded-pill">Delivered</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Order ID: 789012
                    <span className="badge bg-warning rounded-pill">Processing</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Order ID: 345678
                    <span className="badge bg-success rounded-pill">Shipped</span>
                  </li>
                  {/* Add more order items as needed */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
