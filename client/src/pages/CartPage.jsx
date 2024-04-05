import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Layout from "../components/Layout/Layout";
import { useNavigate, useLocation } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const location = useLocation(); // Access the current location object
 

  // Calculate total price
  const total = cart.reduce((acc, c) => acc + c.price, 0);

  useEffect(() => {
    
  
    if (!auth.user) {
     
      setTimeout(() => {
        navigate('/login', { state: { from: location } }); // Pass the current location as state
      }, 2000); // Delay in milliseconds
    }
  }, [auth.user, navigate, location]);

  // Function to handle item removal
  
  
  const handleRemove = (cartId) => {
    setCart(prevCart => prevCart.filter(c => c._id !== cartId));
  };

  return (
    <Layout title="Your Cart">
      <div className="container mt-5">
      <div className="cart-header text-center">
  <h1 className="mb-4">Your Cart</h1>
  <hr className="mb-4" />
  <div className="cart-summary bg-light p-3 rounded">
    <span className="cart-item-count font-weight-bold">{cart.length}</span>
    <span className="cart-item-text">Items</span>
  </div>
</div>
      
        { auth?.user ? (
          <div className="row">
            <div className="col-md-8">
              {cart?.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={item.photo} className="img-fluid rounded-start" alt={item.name} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Price: ${item.price}</p>
                        <button className="btn btn-danger" onClick={() => handleRemove(item._id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <p className="card-text">Total Items: {cart.length}</p>
                  <p className="card-text">Total Amount: ${total.toFixed(2)}</p>
                  <button className="btn btn-primary btn-lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                </div>
              </div>
            </div>
          </div>
        ):(<div className="alert alert-warning" role="alert">
        Redirecting to login page... Please login first.
      </div>)}
         
      </div>
    </Layout>
  );
};

export default CartPage;
