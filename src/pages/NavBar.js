import React, { useState } from 'react'
import asu from "../assets/asu.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { setToken } from '../Components/reducer/slices/authSlice'
import profileSlice, { setUser } from '../Components/reducer/slices/profileSlice'






const NavBar = (props) => {


  const {token}= useSelector( (state) => state.auth);
  const {user}= useSelector( (state) => state.profile);
  const dispatch= useDispatch();

  const setIsLoggedIn=props.setIsLoggedIn;
  const isLoggedIn=props.isLoggedIn;

  const navigate= useNavigate();

  return (

    <div className="flex w-11/12 max-w-[1160px] mx-auto justify-around items-center py-5 ">

    <Link to="/">

        <img src={asu} alt='Logo' width={100} height={32} loading='lazy' className='rounded-md'/>
        
    </Link>

    <>
    {
      token && 
      <div className='flex gap-8'>


        { user!=="Committee" && <NavLink to="/faculty"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white'>Faculty</button>  </NavLink>}


        <NavLink to="/sabbatical"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white'>Leave of Absence</button></NavLink>

        <NavLink 
          to="/committee"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white' >Committee Members</button>
        </NavLink>

        { user === "Chair" &&  <NavLink 
          to="/assignments"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white'>Assignments</button>  
        </NavLink>}

        { (user === "Chair" || user === "Committee") && <NavLink 
          to="/evaluation"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white'>My Evaluations</button>
        </NavLink>}


        <NavLink to="/aggregate"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 text-white' >Aggregated SHEET</button></NavLink>
      </div>
    }
    
    </>

    <div className='flex gap-3'>
    {
        !token &&
            <div className=' flex gap-3'>
            <NavLink to="/login"><button className='rounded-md px-3 py-1 border border-richblack-700 bg-richblack-800 text-white'>Login</button></NavLink>
            <NavLink to="/signup"><button className='rounded-md px-3 py-1 border border-richblack-700 bg-richblack-800 text-white'>Create Account</button></NavLink>
            </div>

    }

    {
        token &&
          <div className=' flex gap-3'>
          <NavLink to="/">
          <button className='rounded-md px-3 py-1 border border-richblack-700 bg-richblack-800 text-white'
           onClick={()=> {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            dispatch(setToken(null))
            dispatch(setUser(null))
            toast.success("Logged out");
            navigate("/login")
          }}>LogOut</button>
          </NavLink>
          {/* <NavLink to="/dashboard"><button className='rounded-md px-3 py-1 border border-richblack-700 bg-richblack-800 text-white'>Dashboard</button></NavLink> */}
          </div>

    }
    
    </div>


    

  </div>
  )
}

export default NavBar;