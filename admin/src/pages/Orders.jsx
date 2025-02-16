


import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url } from '../assets/admin_assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    }
  };

  const statusHandler = async(event,orderId)=>{
   const response  = await axios.post(`${url}/api/order/status`,{
    orderId,
    status:event.target.value
   })

   if(response.data.success){
    await fetchAllOrders()
   }

  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'> 
            <img src={assets.parcel_icon} alt='Parcel Icon' />

            {/* Order Items */}
           <div> 
           <p className='order-item-food'>
              {order.items.map((item, i) =>
                i === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>

            {/* Customer Name */}
            <p className='order-item-name'>
              {order.address.firstName} {order.address.lastName}
            </p>

            {/* Customer Address */}
            <div className='order-item-address'>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
            </div>

            {/* Phone Number */}
            <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            {/* Order Summary */}
            <p><strong>Items:</strong> {order.items.length}</p>
            <p><strong>Total Price:</strong> ${order.amount}</p>
            {/* Order Status Dropdown */}
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} defaultValue="Food Processing">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

        
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
