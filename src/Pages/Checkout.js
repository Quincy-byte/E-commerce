import React, { useContext, useState } from 'react';
import './Checkout.css';
import { ShopContext } from '../Context/ShopContext';

const Checkout = () => {
    const { getTotalCartAmount, cartItems, clearCart } = useContext(ShopContext);
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("card");

    const placeOrder = async () => {
        let responseData;

        await fetch('http://localhost:8000/api/placeorder', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shipping_address: address,
                cartItems: cartItems,
                payment_method: paymentMethod,
            }),
        }).then((response) => response.json()).then((data) => responseData = data);

        if (responseData && responseData.message === "Order placed successfully") {
            alert("Order Placed Successfully!");
            clearCart();
            window.location.replace("/");
        } else {
            alert(responseData ? responseData.message : "Error placing order");
        }
    }

    return (
        <div className='checkout'>
            <div className="checkout-container">
                <h1>Checkout</h1>
                <div className="checkout-fields">
                    <h2>Shipping Address</h2>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <h2>Payment Method</h2>
                    <div className="payment-methods" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ height: '20px', width: '20px' }}
                            />
                            Credit/Debit Card
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '16px', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ height: '20px', width: '20px' }}
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="card-details" style={{ display: 'grid', gap: '15px', padding: '20px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                            <input type="text" placeholder="Card Number" className="card-input" style={{ width: '100%', height: '40px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input type="text" placeholder="MM/YY" className="card-input" style={{ width: '100%', height: '40px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                                <input type="text" placeholder="CVV" className="card-input" style={{ width: '100%', height: '40px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                            </div>
                            <input type="text" placeholder="Card Holder Name" className="card-input" style={{ width: '100%', height: '40px', padding: '10px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                        </div>
                    )}
                </div>
                <div className="checkout-summary">
                    <h2>Order Summary</h2>
                    <p>Total Amount: ${getTotalCartAmount()}</p>
                </div>
                <button onClick={placeOrder}>PLACE ORDER</button>
            </div>
        </div>
    );
};

export default Checkout;
