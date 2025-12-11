import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/userorders', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json()).then((data) => {
            if (Array.isArray(data)) {
                setOrders(data);
            } else {
                window.location.replace('/login');
            }
        });
    }, []);

    return (
        <div className='order-history'>
            <div className="order-history-container">
                <h1>My Orders</h1>
                {orders.length === 0 ? <p>No orders found</p> :
                    <div className="order-list">
                        {orders.map((order, index) => {
                            return (
                                <div key={index} className="order-card" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', background: 'white', marginBottom: '20px' }}>
                                    <div className="order-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>
                                        <div>
                                            <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                                            <span style={{ fontSize: '14px', color: '#6b7280' }}>{new Date(order.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 'bold', color: order.status === 'delivered' ? 'green' : '#d97706', textTransform: 'capitalize' }}>{order.status}</div>
                                            <div style={{ fontWeight: 'bold' }}>${order.total_amount}</div>
                                            <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.payment_method === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</div>
                                        </div>
                                    </div>
                                    <div className="order-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '15px', marginBottom: '10px', alignItems: 'center' }}>
                                                <img src={item.product.image_url} alt={item.product.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <p style={{ margin: 0, fontWeight: '600' }}>{item.product.name}</p>
                                                    <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Qty: {item.quantity} x ${item.price_at_purchase}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default OrderHistory;
