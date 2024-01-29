import React from 'react'
import { Link, NavLink  } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify';



const Navbar = () => {
  const [auth,setauth] = useAuth();
 const handlelogout =()=>{
  setauth({
    ...auth,user:null,token:""
  });
  localStorage.removeItem('auth');
  toast.success("successfully logged out");
 }
  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid ">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/"  className="navbar-brand" >
       🛒E-Commerce</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link " >Home</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link " >category</NavLink >
        </li>
       {!auth.user ? ( <> <li className="nav-item">
          <NavLink to="/register" className="nav-link" >Register</NavLink >
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" >Login</NavLink >
        </li></>):( 
          
          <div className="dropdown">
          <li className="dropdown-toggle nav-link" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {auth?.user.name}
          </li>
          <ul className="dropdown-menu">
            <li className='dropdown-item'>
              <NavLink to={`/dashboard/${auth?.user?.role===1 ? 'admin' :'user'}` }  className="nav-link">Dashboard</NavLink>
            </li>
            <li className="dropdown-item">
              <NavLink onClick={handlelogout} to="/login" className="nav-link">Logout</NavLink>
            </li>
          </ul>
        </div>
    



       )}
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link" >Cart(0)</NavLink >
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>
    
    
    </>
  )
}

export default Navbar