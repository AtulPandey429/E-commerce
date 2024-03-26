import  { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import {toast} from "react-toastify"
import { Link } from "react-router-dom";
import Category from './../../../../server/models/createCategory';

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/update-product/${p.slug}`} // Update the Link to navigate to the update product page directly
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={p.photo}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.price}</p>
                    <p className="card-text">{p.quantity}</p>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">{p.shipping}</p>
                    
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
