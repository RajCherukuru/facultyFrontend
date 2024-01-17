import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { filter_faculty_api, signup_api } from '../services/apis';



const SignUpForm = (props) => {


    const {token}= useSelector((state) => state.auth); 


    
    const setIsLoggedIn=props.setIsLoggedIn;

    const [formData, setFormData]=useState({
        email:"",
        password:"",
        confirmPassword:""
    });

    const [createPassword, setCreatePassword]=useState(true);
    const [confirmPassword, setConfirmPassword]=useState(true);


    function changeHandler(event){
        const{value, type, name}= event.target;
        setFormData( prev => ({...prev, [name]: value }));
    }

    const [accountType, setAccountType]= useState("Committee");


    function createPasswordHandler(){
        setCreatePassword(prev => (!prev));

    }

   

    function confirmPasswordHandler(){
        setConfirmPassword(prev => (!prev));

    }

    const[name, setName]= useState();

    const navigate=useNavigate();

    async function signupHandler(event){
        event.preventDefault();
        if(formData.password!= formData.confirmPassword){
            toast.error("password doesnt match");
            return;
        }
        // setIsLoggedIn(true);

        console.log(name);

        try{
            await axios.post(signup_api, {...formData, role:accountType, name:name, currentRank:currentRank})
        }catch(err){
            console.log("there is error in sending the data")
        }


        toast.success("Successfully Created an Account");

        navigate("/login");

    }

    const [Data, setData]=useState([]);

    const [currentRank, setCurrentRank]= useState('Assistant Professor');


    



  async function handleFilter(rank){
    try {
        setCurrentRank(rank)
        console.log(currentRank)
      const response = await axios.get(`${filter_faculty_api}/${rank}`);
      console.log(response)
      console.log(response.data.body[0].name)
    //   setName(response.data.body[0].name)
      console.log(` this is the name i am setting ${name}`)
      setData(response.data.body);
    } catch (error) {
      console.log(error);
    }
  }

//   useEffect(() =>{
//     handleFilter('Assistant Professor')
// }, [])

const [filterRank, setFilterRank]= useState("Assistant Professor");




const handleRankChange = async (event) => {
    const selectedRank = event.target.value;
    let updatedFilterRank;
  
    switch (selectedRank) {
      case 'Assistant Professor':
        updatedFilterRank = 'Assistant Professor';
        break;
      case 'Associate Professor':
        updatedFilterRank = 'Associate Professor';
        break;
      case 'Professor':
        updatedFilterRank = 'Professor';
        break;
      case 'Research Faculty':
        updatedFilterRank = 'Research Faculty';
        break;
      case 'Teaching Faculty':
        updatedFilterRank = 'Teaching Faculty';
        break;
      // Handle default case if needed
      default:
        // updatedFilterRank = 'default';
        break;
    }
  
    setFilterRank(updatedFilterRank);
    handleFilter(updatedFilterRank); // Pass the updated value directly to handleFilter
  };

     const [staffName, setStaffName]= useState("");
    


  return (
    <div className='flex flex-col gap-4 h-[100vh]'>



        <div className=' bg-richblack-800 w-3/4 rounded-full py-1 border-b flex justify-evenly'>
            <button
            onClick={()=>(setAccountType("Committee"))}
             className= {`${(accountType === "Committee" ) ? 
             "bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} 
             py-2 px-6  text-white rounded-full cursor-pointer`} >Committee Members</button>
            <button onClick={()=>(setAccountType("Staff"))}
             className= {`${(accountType === "Staff" ) ? 
             "bg-richblack-900 text-richblack-5" : " bg-transparent text-richblack-200"} 
             py-2 px-6  text-white rounded-full cursor-pointer`}>Staff</button>
        </div>



        <form className='flex flex-col gap-5' onSubmit={signupHandler}>


           { accountType === "Committee" && <>

            <div className="flex flex-col gap-2">
                <div className= 'text-white text-lg'>Select Rank:</div>
                <select className="bg-richblack-800 border-b rounded-sm p-[9px] text-white" onChange={handleRankChange}>
                <option >choose rank</option>

                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                    <option value="Research Faculty">Research Faculty</option>
                    <option value="Teaching Faculty">Teaching Faculty</option>
                </select>
            </div>


            <div className="flex flex-col gap-2">
                <div className="text-white text-lg">Select Name:</div>
                <select
        className="bg-richblack-800 border-b rounded-sm text-white p-[9px]"
        onChange={(e) => {
            setName(e.target.value);
            console.log(name);
        }}
    >
                        <option >Choose professor</option>

        {Data.map((d) => (
            <option key={d.id} value={d.name}>
                {d.name}
            </option>
        ))}
    </select>
            </div>

            </>}




                { accountType=== "Staff" && <label  className='flex flex-col w-full' >
                    <p className= 'text-white' > Full Name <sup>*</sup></p>
                    <input className=" signup-input bg-richblack-800 border-b rounded-sm p-[9px]"
                        required  
                         value={name} type='text' name='Name' onChange={(e)=> setName(e.target.value)} placeholder='Enter Full Name'></input>
                </label>}

                





            <label  className='flex flex-col'>
                    <p className= 'text-white'>Email Address <sup>*</sup></p>
                    <input className=" signup-input bg-richblack-800 border-b rounded-sm p-[9px] text-white"
                        required  
                        value={formData.email} type='email' name='email' onChange={changeHandler} placeholder='Enter Email Address'></input>
            </label>






            <div className='flex gap-3'>


                <label  className='flex flex-col w-full relative' >
                    <p className= 'text-white'>Create Password <sup>*</sup></p>
                    <input className="signup-input bg-richblack-800 border-b rounded-sm p-[9px] text-white"
                    required
                    type={createPassword ? ("password"):("text")}
                    id='password' value={formData.password} name='password' onChange={changeHandler} placeholder='Enter Password'>
                    </input>
                    <span className='absolute bottom-4 right-1 text-white' onClick={createPasswordHandler} >
                        {
                            createPassword? (<AiOutlineEye/>): (<AiOutlineEyeInvisible/>)
                        }
                    </span>
                </label>



                <label  className='flex flex-col w-full relative'>
                    <p className= 'text-white'>Confirm Password <sup>*</sup></p>
                    <input className="signup-input bg-richblack-800 border-b rounded-sm p-[9px] text-white"
                    required
                    type={confirmPassword ? ("password"):("text")}
                    id='password' value={formData.confirmPassword} name='confirmPassword' onChange={changeHandler} placeholder='Confirm Password'>
                    </input>
                    <span className='absolute bottom-4 right-1 text-white'onClick={confirmPasswordHandler} >
                        {
                            confirmPassword? (<AiOutlineEye/>): (<AiOutlineEyeInvisible/>)
                        }
                    </span>

                </label>

            </div>






            <button className=' text-richblack-700  bg-yellow-500  border-richblack-700 rounded-md py-1 w-full'>Create an Account</button>



        </form>



        






    </div>
  )
}

export default SignUpForm;
