import React from "react";
import { Link, NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <Link to="/" className="navbar-brand">
          <h3>🛒 HomePage<hr></hr></h3>
        </Link>
        <div className="list-group">
          <h4>Admin pannel<hr></hr></h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item-action"
            style={{borderRadius:"2px" ,textDecoration: 'none'}}
          >
            <strong> Create Category</strong>  
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item-action"
            style={{borderRadius:"2px" ,textDecoration: 'none' }}
          >
           <strong> Create Product</strong>
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item-action"
            style={{borderRadius:"2px" ,textDecoration: 'none' }}
          >
            <strong>Products</strong>   
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item-action"
            style={{borderRadius:"2px" ,textDecoration: 'none' }}
          >
            <strong> Orders</strong>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default AdminMenu;
