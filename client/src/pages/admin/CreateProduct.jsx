import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, Input, Select } from 'antd';
import { toast } from 'react-toastify';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [shipping, setShipping] = useState(''); // Default value set to 'No'
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories();
    showModal()
  }, []);

  const handleOk = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('category', selectedCategory);
      formData.append('description', description);
      formData.append('shipping', shipping); // Include shipping in form data
      formData.append('file', file);

      const response = await axios.post('http://localhost:7070/api/v1/product/create-product', formData);

      if (response.data.success) {
        setIsModalVisible(false);
        setName('');
        setPrice('');
        setQuantity('');
        setDescription('');
        setShipping('0'); // Reset shipping to default value
        setFile(null);
        setSelectedCategory('');
        toast.success('Product created successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error('Failed to create product');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create product');
    }
  };

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Layout title="Admin-CreateProduct">
      <div className="row m-2">
        <div className="col-2">
          <AdminMenu />
        </div>
        <div className="col-8">
          <h2>Create Product</h2>
          
          <Modal title="Add Product" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Form>
              <Form.Item label="Name">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
              <Form.Item label="Price">
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </Form.Item>
              <Form.Item label="Quantity">
                <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  showSearch
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  placeholder="Select a category"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category._id}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Description">
                <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
              </Form.Item>
              <Form.Item label="Shipping">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  className="form-select"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Select.Option value="0">No</Select.Option>
                  <Select.Option value="1">Yes</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Photo">
                <input type="file" onChange={handleFileChange} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
