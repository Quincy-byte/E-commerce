import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../Assets/cart_cross_icon.png';

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:8000/api/products') // This is public as per API plan, verify if need token
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_product = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            await fetch('http://localhost:8000/api/removeproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
            await fetchInfo(); // Refresh list after delete
        }
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product, index) => {
                    return <React.Fragment key={index}>
                        <div className="listproduct-format-main listproduct-format">
                            <img src={product.image} alt="" className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
                        </div>
                        <hr />
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}

export default ListProduct;
