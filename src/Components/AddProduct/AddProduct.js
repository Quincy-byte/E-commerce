import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../Assets/upload_area.svg';

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const Add_Product = async () => {
        // console.log("Add Product executed", productDetails);
        let responseData;

        // Create product object
        let product = { ...productDetails, image: image };

        await fetch('http://localhost:8000/api/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((resp) => resp.json()).then((data) => {
            if (data.product) {
                alert("Product Added");
                setProductDetails({
                    name: "",
                    category: "women",
                    new_price: "",
                    old_price: ""
                });
                setImage("");
            } else {
                alert("Failed: " + data.message);
            }
        });
    }

    // Handlers
    const imageHandler = (e) => {
        setImage(e.target.value);
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Image URL</p>
                <input value={image} onChange={imageHandler} type="text" name='image' placeholder='Paste image URL here' style={{ width: '100%', height: '50px', paddingLeft: '15px', border: '1px solid #c3c3c3', borderRadius: '4px', color: '#7b7b7b', fontSize: '16px' }} />
                {image && <img src={image} style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} alt="Preview" />}
            </div>
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct;
