import React from 'react'
import login from  '../assets/login.jpeg'
import frame from '../assets/frame.png'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import {FcGoogle} from "react-icons/fc"

const Template = (props) => {

  const formType=props.formType;

  return (
    <div className='flex w-11/12 max-w-[1160px] mx-auto justify-between '>
        



        <div className='flex w-2/5 max-w-[450px] flex-col gap-4'>
            <h1 className=' text-3xl font-bold'>{props.title}</h1>
            <p className='flex flex-col'>
              <span className='text-richblack-100'>{props.desc1}</span>
              <span className='text-blue-100 italic '>{props.desc2}</span>
            </p>
            {
              (formType === "login") ?  (<LoginForm setIsLoggedIn={props.setIsLoggedIn}></LoginForm>) : (<SignUpForm setIsLoggedIn={props.setIsLoggedIn} />)
            }

            {/* <div className='flex gap-2 justify-center items-center'>
              <hr className=' w-full bg-richblack-700' ></hr>
              <span className='text-richblack-700'>OR</span>
              <hr className='bg-richblack-700 w-full'></hr>
            </div>

           

            <button className=' flex gap-2 justify-center items-center border border-richblack-700 rounded-md py-2 '>
            <FcGoogle></FcGoogle>
            <p className='text-white'>Sign up with Google</p>
            </button> */}

        </div>






        <div className='relative w-2/5 max-w-[450px] ' >
            <img className='absolute right-4 h-96 object-cover' src={props.image} />
            <img src={frame}  width={558} height={504} loading='lazy'/>
        </div>




    </div>
  )
}

export default Template;
