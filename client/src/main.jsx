import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
  <SearchProvider>
  <AuthContextProvider>
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
  </AuthContextProvider>
  </SearchProvider>
  </CartProvider>
);
