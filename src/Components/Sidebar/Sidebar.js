import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import add_product_icon from '../Assets/add.png';
import list_product_icon from '../Assets/hamburger.png';
import orders_icon from '../Assets/cart_icon.png';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <NavLink to={'/admin/addproduct'} style={{ textDecoration: 'none' }} className={({ isActive }) => isActive ? "active-link" : ""}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="" />
                    <p>Add Product</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/listproduct'} style={{ textDecoration: 'none' }} className={({ isActive }) => isActive ? "active-link" : ""}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="" />
                    <p>Product List</p>
                </div>
            </NavLink>
            <NavLink to={'/admin/orders'} style={{ textDecoration: 'none' }} className={({ isActive }) => isActive ? "active-link" : ""}>
                <div className="sidebar-item">
                    <img src={orders_icon} alt="" style={{ width: '25px' }} />
                    <p>Orders</p>
                </div>
            </NavLink>
        </div>
    )
}

export default Sidebar;
