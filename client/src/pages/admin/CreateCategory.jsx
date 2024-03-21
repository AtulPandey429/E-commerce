import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7070/api/v1/category/allcategory"
      );
      if (res.data.success) {
        setCategories(res.data.category);
        toast.success(res.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while fetching categories.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:7070/api/v1/category/create-category",
        { name }
      );
      if (res.data.success) {
        getAllCategory();
        toast.success(res.data.message);
        setName("");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while creating the category."
      );
    }
  };

  const handleEdit = async (category_id) => {
    try {
      const res = await axios.put(
        `http://localhost:7070/api/v1/category/update-category/${category_id}`,
        { name } // Send the updated name in the request body
      );
      if (res.data.success) {
        getAllCategory();
        toast.success(res.data.message);
        setName("");
        setEditCategory(null); // Reset the edit state after successful update
      }
    } catch (error) {
      toast.error(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while updating the category."
      );
    }
  };

  return (
    <Layout title="admin-CreateCategory">
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <AdminMenu />
          </div>
          <div className="col">
            <h3 className="my-4">Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </form>
            <table className="table mt-4">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>
                      {editCategory === category._id ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      ) : (
                        category.name
                      )}
                    </td>
                    <td>
                      {editCategory === category._id ? (
                        <button
                          className="btn btn-success"
                          onClick={() => setEditCategory(null)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-info"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
