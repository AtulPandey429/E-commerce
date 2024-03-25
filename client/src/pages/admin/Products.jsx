import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Modal } from 'antd';
import { Link } from 'react-router-dom';
import AdminMenu from '../../components/layout/AdminMenu';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getAllProduct();
    }, []);

    // Function to fetch all products from the backend
    const getAllProduct = async () => {
        try {
            const res = await axios.get('http://localhost:7070/api/v1/product/get-products');
            if (res.data.success) {
                setProducts(res.data.products);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("error is :", error);
            toast.error("Something went wrong");
        }
    };

    // Function to handle image click
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    // Function to close modal
    const handleModalClose = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    return (
        <Layout title='Products'>
            <div className="container">
                <h2 className="text-center my-4">Products</h2>
                <div className="row">
                    <div className="col-md-2">
                        <AdminMenu />
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            {products.map((p) => (
                                <div key={p._id} className="col-lg-3 col-md-4 mb-4">
                                    <div className="card h-100">
                                        <img className="card-img-top" src={p.photo} alt={p.name} onClick={() => handleImageClick(p.photo)} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.description}</p>
                                            <p className="card-text">Price: ${p.price}</p>
                                            <p className="card-text">Quantity: {p.quantity}</p>
                                            <Link to={`/product/update/${p._id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>Update Product</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                onCancel={handleModalClose}
                footer={null}
                width={800}
            >
                <img src={selectedImage} alt="Selected" style={{ width: '100%' }} />
            </Modal>
        </Layout>
    );
};

export default Products;
