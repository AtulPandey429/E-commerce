import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Layout from "../components/Layout/Layout";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Message = styled.h2`
  color: ${(props) => (props.hasItems ? "#00cc00" : "#ff0000")};
  font-size: 1.5rem;
  text-align: center;
`;

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Calculate total price
  const total = cart.reduce((acc, c) => acc + c.price, 0);

  useEffect(() => {
    if (!auth.user) {
      const redirectTimer = setTimeout(() => {
        navigate('/login', { state: { from: location } });
      }, 2000);
      return () => clearTimeout(redirectTimer);
    }
  }, [auth.user, navigate, location]);

  const handleRemove = (cartId) => {
    setCart(prevCart => prevCart.filter(c => c._id !== cartId));
  };

  return (
    <Layout title="Your Cart">
      <div className="container mt-5">
        <div className="cart-header text-center">
          <Message hasItems={cart.length}>
            {cart.length ? (
              <>
                You have {cart.length} items in your cart{" "}
                {!auth.token && <span>Please login to checkout</span>}
              </>
            ) : (
              "Your Cart Is Empty"
            )}
          </Message>
        </div>
        {auth?.user ? (
          <div className="row">
            <div className="col-md-8">
              {cart?.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.photo}
                        className="img-fluid rounded-start"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Price: ${item.price}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {cart.length > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Total</h5>
                    <p className="card-text">Total Items: {cart.length}</p>
                    <p className="card-text">Total Amount: ${total.toFixed(2)}</p>
                    <div className="mb-3">
                      <h4>Shipping Address</h4>
                      {auth?.user?.address ? (
                        <>
                          <p>{auth?.user?.address}</p>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/profile")}
                          >
                            Update Address
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Add Address
                        </button>
                      )}
                    </div>
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="alert alert-warning" role="alert">
            Redirecting to login page... Please login first.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
