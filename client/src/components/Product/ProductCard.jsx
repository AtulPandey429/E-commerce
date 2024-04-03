/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

// eslint-disable-next-line react/prop-types
const ProductCard = ({ product, index }) => {
  
 const navigate = useNavigate();
const [cart,setCart] = useCart();
  
const addToCart = () => {
  setCart([...cart, product]);
};
  return (
    // eslint-disable-next-line react/prop-types
    <div key={product._id || index} className="col-md-4 mb-3">
      <div className="card h-100">
        <img
          src={product.photo}
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text">Price: ${product.price}</p>
          <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product-detail/${product.slug}`)}>More Details</button>
          <button className="btn btn-warning ms-1" onClick={()=>addToCart()}>ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
