import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FaBackward } from "react-icons/fa";
import EmployeeForm from "../../Components/EmployeeForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createfaculty_api } from "../../services/apis";



const CreateFacultyPage = () => {

    const navigate= useNavigate();

    const [name, setName]= useState("");
    const [date, setDate]= useState("");
    const [rank, setRank]= useState("");
    const [teaching, setTeaching]= useState("");
    const [research, setResearch]= useState("");
    const [service, setService]= useState("");
  
  
    // const createEmployee = async (data) => {
  
    //   const savedUserResponse = await fetch(
    //     `${process.env.REACT_APP_BASE_URL}/createUser`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ ...data }),
    //     }
    //   );
  
    //   console.log("FORM RESPONSE......", savedUserResponse);
  
    //   navigate(-1);
    // };
  
    
      function handleSubmit(event){
        event.preventDefault();
        axios.post(createfaculty_api, {name, date, rank, teaching, research, service} )
        .then(res=>console.log(res))
        .catch(er=> console.log(er));
        navigate(-1);
      }








  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[100vh]">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover object-top"
              src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
              Empower your business with our employee creation!
              </h3>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              Create New Faculty
            </h2>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300 cursor-pointer">
              <div onClick={() => navigate(-1)}
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 flex items-center gap-3"
              >
                {/* <FaBackward /> */}
                Back to Faculty List
              </div>
            </p>

            {/* <EmployeeForm /> */}

            <div>
      <form onSubmit={handleSubmit} className="mt-8">

        <div className="space-y-5">






          <div>
            <label
              htmlFor="name"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Faculty Name{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter You Full Name"
                // {...register("name")}
              ></input>
            </div>
          </div>









          <div className="flex flex-col gap-2">

                <p>Select Rank</p>
            
                <select className="bg-richblack-800 border-b rounded-sm p-[9px] text-white w-[450px]" onChange={(e)=>setRank(e.target.value)}>
                    <option >Choose Rank</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Professor">Professor</option>
                    <option value="Research Faculty">Research Faculty</option>
                    <option value="Teaching Faculty">Teaching Faculty</option>
                </select>
          </div>



          <div>
            <label
              htmlFor="department"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Start Date{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="text"
                onChange={(e)=>setDate(e.target.value)}
                placeholder="Enter Start Date"
                // {...register("department")}
              ></input>
            </div>
          </div>







          <div>
            <label
              htmlFor="department"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Teaching{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="number"
                onChange={(e)=>setTeaching(e.target.value)}
                placeholder="Teaching Score"
                // {...register("department")}
              ></input>
            </div>
          </div>






          <div>
            <label
              htmlFor="department"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Research{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="number"
                onChange={(e)=>setResearch(e.target.value)}
                placeholder="Research Score"
                // {...register("department")}
              ></input>
            </div>
          </div>







          <div>
            <label
              htmlFor="department"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              {" "}
              Service{" "}
            </label>
            <div className="mt-2.5">
              <input
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                type="number"
                onChange={(e)=>setService(e.target.value)}
                placeholder="Enter Your Employee Department"
                // {...register("department")}
              ></input>
            </div>
          </div>











         

          <div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
            >
              Create New Faculty
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-2 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>








        </div>
      </form>
    </div>



          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateFacultyPage;
