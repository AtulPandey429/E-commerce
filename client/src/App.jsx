

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PagenotFound from "./pages/PagenotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/privateRoutes/PrivateRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserProfile from "./pages/user/UserProfile";
import Order from "./pages/user/Order";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpadateProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/order" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory/>} />
          <Route path="admin/create-products" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </>
  );
}

export default App;
