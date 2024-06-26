import React, { useState } from 'react'
import asu from "../assets/asu.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import authSlice, { setToken } from '../Components/reducer/slices/authSlice'
import profileSlice, { setUser } from '../Components/reducer/slices/profileSlice'
import colourSlice, {setColour} from '../Components/reducer/slices/colourSlice'





const NavBar = (props) => {


  const {token}= useSelector( (state) => state.auth);
  const {user}= useSelector( (state) => state.profile);
  const {colour}= useSelector( (state) => state.colour);
  const dispatch= useDispatch();

  const setIsLoggedIn=props.setIsLoggedIn;
  const isLoggedIn=props.isLoggedIn;

  const navigate= useNavigate();

  const handleColour= (colour) => {
    dispatch(setColour(colour));
  }


  

  return (


    <div className='w-full flex items-center'>

          <div className=' bg-richblack-800 w-1/10 h-10  rounded-full py-1 border-b flex justify-evenly'>
            <button
                onClick={()=>handleColour("dark")}
                className= {`${(colour === "dark" ) ? 
                "bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} 
                py-2 px-6  text-white rounded-full cursor-pointer`} >Dark
             </button>
            <button onClick={()=>handleColour("light")}
                className= {`${(colour === "light" ) ? 
                "bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} 
                py-2 px-6  text-white rounded-full cursor-pointer`}>Light
             </button>
        </div>




      <div className="flex w-full max-w-[1300px] mx-auto justify-between items-center py-5">





        <div className='flex justify-between items-center gap-2'>
            <Link to="/">
              <img src={asu} alt='Logo' width={100} height={32} loading='lazy' className='rounded-md'/>
            </Link>

        </div>

          


        <>
        {
          token && 
          <div className='flex gap-8'>


            { user!=="Committee" && <NavLink to="/faculty"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 '>Faculty</button>  </NavLink>}


            <NavLink to="/sabbatical"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7'>LOA</button></NavLink>

            <NavLink 
              to="/committee"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 ' >Committee Members</button>
            </NavLink>

            { user === "Chair" &&  <NavLink 
              to="/assignments"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 '>Assignments</button>  
            </NavLink>}

            { (user === "Chair" || user === "Committee") && <NavLink 
              to="/evaluation"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 '>My Evaluations</button>
            </NavLink>}


            <NavLink to="/aggregate"><button className='rounded-md  px-3.5 py-1.5 text-sm font-semibold leading-7 ' >Aggregated Sheet</button></NavLink>

            

          
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



    </div>

  )
}

export default NavBar;