

// import moment from "moment";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import  axios from 'axios';
import Layout from "../../components/Layout/Layout";
import UserMenue from './../../components/layout/UserMenu';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenue />
          </div>
          <div className="col-md-9">
            <h3>Order History</h3>
            {orders.map((order, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Order ID: {order._id}
                      <span className={`badge ${getBadgeColor(order.status)} rounded-pill`}>
                        {order.status}
                      </span>
                    </li>
                    {/* Add more order details here */}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to determine badge color based on order status
const getBadgeColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-primary";
    case "Processing":
      return "bg-warning";
    case "Shipped":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

export default Orders;
