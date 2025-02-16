


import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import {  useNavigate} from 'react-router-dom'


const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", state: "",
    zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!url) {
      console.error("Error: Backend URL is missing");
      alert("Error: Backend URL is missing");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    console.log("Order Items:", orderItems);

    let orderData = {
      userId: token, // Ensure this is being sent
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });
      console.log("response= ",response.data.data)

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Order failed. Please try again.");
    }
  };
  const navigate = useNavigate()

  useEffect(()=>{
    if(!token){
     navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'> 
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name'/>
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last Name'/>
        </div>
        <input required type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address'/>
        <input type='text' name='street' onChange={onChangeHandler} value={data.street} placeholder='Street'/>
        <div className='multi-fields'>
          <input required type='text' name='city' onChange={onChangeHandler} value={data.city} placeholder='City'/>
          <input required type='text' name='state' onChange={onChangeHandler} value={data.state} placeholder='State'/>
        </div>
        <div className='multi-fields'>
          <input required type='text' name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zipcode'/>
          <input required type='text' name='country' onChange={onChangeHandler} value={data.country} placeholder='Country'/>
        </div>
        <input required type='text' name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone'/>
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <p>Delivery Fees</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr/>
          <div className='cart-total-details'>
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type='submit'> PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
