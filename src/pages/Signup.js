import React from 'react'
import SignUpForm from './SignUpForm';
import Template from './Template';
import signupImg from "../assets/signup.jpeg"


const Signup = (props) => {

  const setIsLoggedIn=props.setIsLoggedIn;
  return (

    <Template  title="Create Your Account Here" 
    // desc1="Build skills for today, tomorrow, and beyond." 
    // desc2="Education to future-proof your career." 
    image={signupImg}
    formType="signup"
    setIsLoggedIn={setIsLoggedIn}>
    </Template>

  )
}

export default Signup;
