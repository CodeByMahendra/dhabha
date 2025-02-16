import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/frontend_assets/assets';
import axios from 'axios';
import jwt_decode from 'jwt-decode';  // Default import

const MyOrders = () => {
    const { token ,url } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            // Decode the token to get the userId
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.userId;

            const response = await axios.post(
                `${url}/api/order/userOrders`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Response:", response.data);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt='' />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " X " + item.quantity;
                                } else {
                                    return item.name + " X " + item.quantity + " , ";
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyOrders;
