import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
const Navbar = () => {

    const [menu,setMenu] = useState("home");
    return (
        <div className = 'navbar'>
            <div className = "nav-logo">
                <img src={logo} alt = "" />
                <p>SHOP</p>
            </div>
            <ul className = "nav-menu">
                <li onClick={()=>{setMenu("home")}}><Link style={{ textDecoration: 'none'}} to='/'>Home</Link>{menu==="Home"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("men")}}><Link style={{ textDecoration: 'none'}} to='/men'>Men</Link>{menu==="Men"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("women")}}><Link style={{ textDecoration: 'none'}} to='/women'>Women</Link>{menu==="Women"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("kids")}}><Link style={{ textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="Kids"?<hr/>:<></>}</li>
            </ul>
            
           <div className = "nav-login-cart">
                <Link to='/Login'><button>Login</button></Link>
                <Link to='/cart'><img src = {cart_icon} alt="" /></Link>
                <div className ="nav-cart-count">0</div>

            </div>
        </div>
    )
}

export default Navbar