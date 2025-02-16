import React, { useState } from "react";
import Navbar from './pages/Navbar'
import{Routes,Route} from 'react-router-dom'
import Cart from './pages/Cart'
import Home from './pages/Home'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import Login from './components/Login'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./pages/Verify";
import MyOrders from './pages/MyOrders'



const App = () => {


  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    <ToastContainer/>
    {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
   
      <Navbar setShowLogin={setShowLogin}/>
     

      <Routes>

<Route path='/' element={<Home/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/order' element={<PlaceOrder/>} />
<Route path='/verify' element={<Verify/>} />
<Route path='/myorders' element={<MyOrders/>} />






</Routes>
    </div>
          <Footer/>

         
          </>

  )
}

export default App