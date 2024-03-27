import { useCallback, useEffect, useState } from 'react';
import ecommerce from '../../public/images/ecommerce.jpg';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get('http://localhost:7070/api/v1/category/allcategory');
      if (response.data.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch categories');
    }
  };

  const getAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/v1/product/get-products");
      setProducts(data.products);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  }, []);

  // Load products on component mount
  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, [getAllProducts]);

  return (
    <Layout title={'HomePage'}>
        < div className="row">
          
            <img src={ecommerce} alt=""  />
          
        </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="mb-3">
              <h5>All Categories</h5>
              {categories.map((c) => (
                <div key={c.id} className="form-check">
                  <input className="form-check-input" type="checkbox" value={c.id} id={`category-${c.id}`} />
                  <label className="form-check-label" htmlFor={`category-${c.id}`}>
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <h5>Filter By Price</h5>
              {/* Add your price filter UI here */}
            </div>
          </div>
          <div className="col-md-9">
            <h3>All Products</h3>
            <div className="row">
              {products.map((p) => (
                <div key={p.id} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <img src={p.photo} alt="" className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">Price: {p.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
