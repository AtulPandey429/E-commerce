import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const params = useParams();

  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:7070/api/v1/product/get-product/${params.slug}`);
      console.log(res.data.product);
      setProduct(res.data.product);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, [params.slug]);

  return (
    <Layout title='Product-details'>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={product.photo} alt={product.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h1>Name:{product.name}</h1>
            <p>Description:{product.description}</p>
            <p className="fw-bold">Price:${product.price}</p>
            <p className="fw-bold">Category:{product?.category?.name}</p>
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
