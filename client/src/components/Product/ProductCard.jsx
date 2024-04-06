/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ImageComponent from './Image';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [addingToCart, setAddingToCart] = useState(false);

  const addToCart = () => {
    setAddingToCart(true); // Set addingToCart to true to show the notification
    setTimeout(() => {
      setCart([...cart, product]);
      setAddingToCart(false); // Reset addingToCart after a delay
    }, 1000); // Simulate a delay of 1 second (1000 milliseconds)
  };

  const isProductInCart = cart.some(item => item._id === product._id);

  return (
    <div key={product._id || index} className="col-md-4 mb-3">
      <div className="card h-100">
       <ImageComponent src={product.photo} alt={product.name} id={product._id} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text">Price: ${product.price}</p>
          <button className="btn btn-primary ms-1" onClick={() => navigate(`/product-detail/${product.slug}`)}>More Details</button>
          <button className={`btn btn-warning ms-1 ${isProductInCart ? 'disabled' : ''}`} onClick={addToCart} disabled={isProductInCart}>
            {isProductInCart ? 'Added to Cart' : 'ADD TO CART'}
          </button>
          {addingToCart && <p className="text-success">Adding to Cart...</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
