import React from "react";
import './RelatedProducts.css';
import data_product from '../Assets/data';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ currentProductId }) => {
    // Filter out the current product and select a limited number of related products
    const relatedProducts = data_product
        .filter(item => item.id !== currentProductId) // Exclude current product
        .slice(0, 4); // Select the first 4 related products

    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-items">
                {relatedProducts.map((item, i) => (
                    <Link to={`/product/${item.id}`} key={item.id} className="relatedproducts-item">
                        <img src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <div className="relatedproducts-prices">
                            <div className="relatedproducts-price-new">${item.new_price}</div>
                            <div className="relatedproducts-price-old">${item.old_price}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;