import React from 'react'
import Template from './Template';
import loginImg from "../assets/login.jpeg"


const Login = (props) => {
  const setIsLoggedIn=props.setIsLoggedIn;
  return (
   <Template 
   title="Welcome Back"
  //  desc1="Build skills for today, tomorrow, and beyond." 
  //  desc2="Education to future-proof your career." 
   image={loginImg}
   formType="login"
   setIsLoggedIn={setIsLoggedIn}>
   </Template>
   
  )
}

export default Login;
