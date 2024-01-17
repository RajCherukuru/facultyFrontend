import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { setAuthentication } from '../Components/auth';
import { setToken } from '../Components/reducer/slices/authSlice';
import { setUser } from '../Components/reducer/slices/profileSlice';
import { apiConnector } from '../services/apiconnector';
import { useDispatch } from 'react-redux';
import { login } from '../services/authapi';


const LoginForm = (props) => {

    console.log(props);
    const setIsLoggedIn = props.setIsLoggedIn;
    const navigate= useNavigate();
    const dispatch= useDispatch();


    const [formData, setFormData]=useState({
        email:"", password:""
    });

    const [password, setPassword]=useState(true);

    function changeHandler(event){
        const{value, type, name}= event.target;
        setFormData( prev => ({...prev, [name]: value }));
    }

    function passwordHandler(){
        setPassword(prev => (!prev));

    }

    async function submitHandler(event){

        event.preventDefault();
        const {email, password}= formData;
        console.log("we are at submit handler")
        dispatch(login(email, password, navigate))

        // setIsLoggedIn(true);

        // console.log(formData);

        // try{

        //     const response = await apiConnector("POST", "http://localhost:3001/api/v1/login", {
        //         ...formData
        //       })

        //       console.log("LOGIN API RESPONSE............", response);

        //       toast.success("Login Successful")
        //     dispatch(setToken(response.data.token))
        //     dispatch(setUser(response.data.dbuser.role))

        //     localStorage.setItem("token", JSON.stringify(response.data.token))

        //     // const response= await axios.post("http://localhost:3001/api/v1/login", {...formData});
        //     // // const { token } = response.data;
        //     // if(response.data){ 
        //     //     const token= response.data.token;
        //     //     localStorage.setItem('jsonwebtoken', token)
        //     //     setAuthentication(token);
        //     // }
        // }catch(err){
        //     console.log("there is error in sending the login data")
        //     console.log("LOGIN API ERROR............", err)
        //     toast.error("Login Failed")
        // }
        

        // toast.success("Logged In");
        // navigate("/faculty");

    }


  return (
    <form className='flex flex-col gap-3 h-[100vh]' onSubmit={submitHandler}>


    <div className='flex flex-col gap-1 '>
        <label className='text-white' htmlFor='email'>Email Address</label>
        <input required  className="signup-input bg-richblack-800 border-b rounded-sm text-white p-[9px]" value={formData.email} type='email' name='email' onChange={changeHandler} id='email' placeholder='Enter email address'></input>
    </div>



    <div className='relative' >
        <label className='flex flex-col' htmlFor='password'>
            <p className='text-white'>Password</p>
            <input 
            className="signup-input bg-richblack-800 border-b rounded-sm text-white p-[9px]"type={password ? ("password"):("text")}
            id='password' required value={formData.password} name='password' onChange={changeHandler} placeholder='Enter Password'>
            </input>
            <span className='absolute bottom-14 right-2 cursor-pointer text-white' onClick={passwordHandler} >
                {
                    password? (<AiOutlineEye/>): (<AiOutlineEyeInvisible/>)
                }
            </span>

            <Link to="/forgotpassword" className='m-3'>
                <p className=' text-blue-700  text-xs  text-end'>Forgot Password</p>
            </Link>
        </label>
       
    </div>




    
    <button className=' text-richblack-700  bg-yellow-500  border-richblack-700 rounded-md py-1 w-full'>Sign In</button>
    

    
        
    </form>
  )
}

export default LoginForm;