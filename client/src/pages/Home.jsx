import  { useCallback, useEffect, useState } from 'react';
import ecommerce from '../../public/images/ecommerce.jpg';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Prices } from '../components/spinner/Prices';
import { Radio } from 'antd';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]); // Array of selected category IDs
  const [price, setPrice] = useState([]); // Selected price range (string)

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

  // handlecheck function
 
  const handlecheck = (e, id) => {
    const isChecked = e.target.checked;
    let updatedChecked = [...checked];
    
    if (isChecked && !updatedChecked.includes(id)) {
      updatedChecked.push(id);
    } else if (!isChecked && updatedChecked.includes(id)) {
      updatedChecked = updatedChecked.filter((c) => c !== id);
    }
  
    setChecked(updatedChecked);
  };
  



  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/api/v1/product/get-products");
      setProducts(data.products);
      toast.success(data.message);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching products");
    }
  };

  // productFilter function by backend api
  const productFilter = useCallback(async () => {
    try {
      const res = await axios.post("http://localhost:7070/api/v1/product/product-filter", {
        checked,
        price
      });
      if (res.data.success) {
        setProducts(res.data.products);
        toast.success('Filtered data fetched');
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while filtering products");
    }
  }, [checked, price]);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (checked.length || price) {
      // Trigger filter if either checked or price has a value
      productFilter();
    } else {
      getAllProducts();
    }
  }, [checked, price]);

  return (
    <Layout title={'HomePage'}>
      <div className="row">
        <img src={ecommerce} alt="" />
      </div>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="mb-3">
              <h5>All Categories</h5>
              {categories.map((c, index) => (
                <div key={c._id || index} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={c._id} // Use the category ID as the value
                    id={`category-${c._id}`}
                    onChange={(e) => handlecheck(e, c._id)} // Arrow function for event handler
                  />
                  <label className="form-check-label" htmlFor={`category-${c._id}`}>
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <h5>Filter By Price</h5>
              <Radio.Group onChange={(e) => setPrice(e.target.value)}>
                {Prices?.map((p, index) => (
                  <div key={index}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div className="col-md-9">
            <h3>All Products</h3>
            <div className="row">
              {products.map((p, index) => (
                <div key={p._id || index} className="col-md-4 mb-3">
                  <div className="card h-100">
                    <img
                      src={p.photo}
                      alt=""
                      className="card-img-top"
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                      <p className="card-text">Price: ${p.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
};

export default Home;
