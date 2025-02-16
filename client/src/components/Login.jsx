import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = ({setShowLogin}) => {
    const {url,setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Sign Up")
    const [data, setData] = useState({
        fullName:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
   
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event)=>{
        event.preventDefault()
         let newUrl = url;

        if(currentState==="Login"){
            newUrl += "/api/user/login"

        }
        else{

            newUrl += "/api/user/signup";

        }

        const response = await axios.post(newUrl,data )
   

           console.log("response=",response)

           
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)

        }
        else{
      toast.success(response.data.message);
        }
    }

    useEffect(()=>{
       console.log(data)  

    },[data])

  return (
    <div className='login'>
    
    <form onSubmit={onLogin} className='login-container'>
        <div className='login-title'>
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>


        </div>
        <div className='login-inputs'>
            {currentState==="Login"?<></>:<input name='fullName' type='text' onChange={onChangeHandler} value={data.fullName} placeholder='Enter your name' required />}
            <input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='"Enter Your email' required />
            <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter your password' required />

        </div>
        <button type='submit'>{currentState ==="Sign Up"?"Create-account":"Login"}</button> 
        <div className='login-condition'>

            <input type='checkbox' required />
            <p>By continuing , i agree to the terms of use and privacy policy.</p>

        </div>
        {currentState==="Login"?        <p>Create a new account? <span onClick={()=>{setCurrentState('Sign Up')}}>Click here</span></p>:
                <p>Already have an account? <span onClick={()=>{setCurrentState('Login')}}>Login here</span></p>

}
    </form>
    </div>
  )
}

export default Login



