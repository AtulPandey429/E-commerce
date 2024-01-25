import React from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";

import { Helmet } from "react-helmet";
// import { ToastContainer} from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children, title, description, keywords, author }) => {
  
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Navbar />

      <main style={{ height: "80vh" }}>
        {children}
        {/* <ToastContainer /> */}
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Ecommerce App-shopping",
  description: "Mern Stack Project",
  keywords: "Html,css,node,express,react,javaScript,mongoDb",
};
export default Layout;
