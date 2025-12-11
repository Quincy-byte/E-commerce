import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext';
const Navbar = () => {
    //rhea
    const [menu, setMenu] = useState("home");
    const { getTotalCartItems } = useContext(ShopContext);
    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    const isAdmin = userInfo && userInfo.is_admin;
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOP</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "Home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("men") }}><Link style={{ textDecoration: 'none' }} to='/men'>Men</Link>{menu === "Men" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("women") }}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === "Women" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "Kids" ? <hr /> : <></>}</li>
                {localStorage.getItem('auth-token') ? <li onClick={() => { setMenu("orders") }}><Link style={{ textDecoration: 'none' }} to='/orders'>Orders</Link>{menu === "Orders" ? <hr /> : <></>}</li> : <></>}
                {isAdmin ? <li onClick={() => { setMenu("admin") }}><Link style={{ textDecoration: 'none' }} to='/admin'>Admin</Link>{menu === "Admin" ? <hr /> : <></>}</li> : <></>}
            </ul>

            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')
                    ? <button onClick={() => { localStorage.removeItem('auth-token'); localStorage.removeItem('user-info'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/Login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar