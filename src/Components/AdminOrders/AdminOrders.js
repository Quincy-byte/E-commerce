import React, { useState, useEffect } from 'react';
import './AdminOrders.css';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        await fetch('http://localhost:8000/api/allorders', {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            }
        })
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const statusHandler = async (e, orderId) => {
        const newStatus = e.target.value;
        await fetch(`http://localhost:8000/api/status/${orderId}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            },
            body: JSON.stringify({ status: newStatus })
        });
        await fetchOrders(); // Refresh list
    }

    return (
        <div className='admin-orders'>
            <h1>Order Management</h1>
            <div className="order-list">
                {orders.map((order, index) => {
                    return (
                        <div key={index} className="admin-order-item">
                            <h3>Order #{order.id}</h3>
                            <p>User: {order.user ? order.user.email : 'Guest'}</p>
                            <p>Address: {order.shipping_address}</p>
                            <p>Total: ${order.total_amount}</p>
                            <p className="status-cell">
                                <select
                                    onChange={(event) => statusHandler(event, order.id)}
                                    value={order.status}
                                    style={{
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        border: 'none',
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        cursor: 'pointer',
                                        backgroundColor: order.status === 'delivered' ? '#d1fae5' :
                                            order.status === 'shipped' ? '#dbeafe' : '#fef3c7',
                                        color: order.status === 'delivered' ? '#065f46' :
                                            order.status === 'shipped' ? '#1e40af' : '#92400e',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="out for delivery">Out for Delivery</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AdminOrders;
