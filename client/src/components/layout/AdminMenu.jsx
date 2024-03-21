
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item list-group-item-warning ">
          <NavLink to="" className='text-dark' style={{ textDecoration: "none",borderBottom:"0" }}>
            Create-User
          </NavLink>
        </li>
        <li className="list-group-item list-group-item-primary ">
          <NavLink to="/dashboard/admin/create-products"className='text-dark' style={{ textDecoration: "none" ,borderBottom:"0"}}>
            Create-Product
          </NavLink>
        </li>
        <li className="list-group-item list-group-item-secondary">
          <NavLink to="/dashboard/admin/create-category" className='text-dark' style={{ textDecoration: "none" ,borderBottom:"0"}}>
            Create-Category
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
