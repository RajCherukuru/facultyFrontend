import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import profileSlice from "../../Components/reducer/slices/profileSlice";
import { useSelector } from "react-redux";
import { FcUndo } from "react-icons/fc";
import { toaster } from "toaster-js/Toaster";
import toast from "react-hot-toast";
import { committee_api, committeeid_api, deletecommittee_api, roundrobin_api, updateassignment_api, updatecommittee_api } from "../../services/apis";
import { RowColour } from "../../utils/RowColour";



const Committee = () => {

  const [data, setData] = useState([]);

  const {user}= useSelector( (state) => state.profile);

  const {colour}= useSelector( (state) => state.colour);



  const [name, setName]= useState("");
  const [email, setEmail]= useState("");
  const [rank, setRank]= useState("");
  const [year, setYear]= useState("");
  const [editId, setEditId]= useState(-1);

  const fetchData = async () => {
    

    try {
      const response = await axios.get(committee_api);
      console.log(response.data.body);
      setData(response.data.body);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);



  function handleEdit(id){
    console.log(id)

    axios.get(`${committeeid_api}/${id}`)
    .then((res)=>{
        console.log(res);
        setName(res.data.value.name)
        setEmail(res.data.value.email)
        setRank(res.data.value.currentRank)
        setYear(res.data.value.academicYear)
    })
    .catch((err) => console.log("error"))

    setEditId(id);

  }

  async function handleUpdate(id){

    try {
        await axios.put(`${updatecommittee_api}/${id}`, {name, email, rank, year});
      setEditId(-1);
      await fetchData();
      } catch (error) {
        console.log(error);
      }
      

  }

  async function handleDelete(id){

    try {
      await axios.post(`${deletecommittee_api}/${id}`);
    setEditId(-1);
    await fetchData();
    } catch (error) {
      console.log(error);
    }
      

  }


  const professorsWithRanks = [
    { id: 0, name: "Choose Rank"},
    { id: 1, name: "Professor"},
    { id: 2, name: "Assistant Professor" },
    { id: 3, name: "Associate Professor" },
    { id: 4, name: "Teaching Faculty" },
    { id: 5, name: "Research Faculty" }
  ];

  // const professors = [
  //   { id: 0, name: "Choose Assignment" },
  //   { id: 1, name: "Douglas Montgomery" },
  //   { id: 2, name: "Guoliang Xue" },
  //   { id: 3, name: "Hasan Davulcu" },
  //   { id: 4, name: "Hessam Sarjoughian" },
  //   { id: 5, name: "Paulo Shakarian" },
  //   { id: 6, name: "Rong Pan" },
  //   { id: 7, name: "Chitta Baral" },
  //   { id: 8, name: "Stephen Yau" }
  // ];

  

    async function roundRobin(){
      try {
        await axios.post(`${roundrobin_api}`);
        toast.success("Round Robin Successful")
      } catch (error) {
        console.log(error);
      }
    }





  return (
    <>
      <section className="px-4 mx-auto py-4  h-full min-h-100vh">
        <div className="flex items-center justify-between">


          <div>
            <h2 className="text-lg font-medium  dark:text-white">
            Faculty
            </h2>
            <div className="text-lg font-medium  dark:text-white">Academic Year: 2023-2024</div>
            <p className="mt-1 text-sm dark:text-gray-300">
              This is a list of all Faculty. You can add new Faculty, edit
              or delete existing ones.
            </p>
          </div>

          <div className="flex flex-row gap-2">

          

          { (user === "Chair" || user=== "Staff")  && <Link to={"/addcommittee"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Committee
              </button>
            </div>
          </Link>
}

 {/*{ (user === "Chair" || user=== "Staff")  && 
                              <button onClick={roundRobin} className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                                Create Round Robin
                              </button>
                            
                }*/}
</div>





        </div>
        <div className="flex flex-col mt-6 ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" table-container overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">



                  <thead className={`bg-gray-50 dark:bg-gray-800 sticky-thead ${colour==="dark"? "color": "color-light"}`}>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right "
                      >
                        <span>Name</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Email
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Current Rank
                      </th>

                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Academic Year
                      </th> */}

                     { user !== "Committee" && <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right "
                      >
                        Actions
                      </th>}



                    </tr>
                  </thead>



                  

                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {
                        data.map((row, index) =>(

                            row._id!== editId ?

                         <tr key={row._id} className={RowColour(colour, index)}>

                                    <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                                {row.name}
                                </td>


                                <td className="px-12 py-4   whitespace-nowrap">
                                {row.email}
                                </td>


                                <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                {row.currentRank}
                                </td>

                                {/* <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                {row.academicYear}
                                </td> */}

                                { user !== "Committee" && <td className="px-4 py-4 whitespace-nowrap text-sm   ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleEdit(row._id)}>edit</button>
                                    <button onClick={()=>handleDelete(row._id)}>delete</button>
                                </div>
                                </td>}
                                </tr>


                        :

                        <tr key={row._id} className={RowColour(colour, index)}>

                                <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>


                                {/* <select onChange={(e)=>setName(e.target.value)}>
                              {
                                professors.map((prof) => (
                                  <option key={prof.id} value={prof.name}>
                                    {prof.name}
                                  </option>
                                ))
                              }
                           </select> */}


                                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>


                                </td>


                                <td className="px-12 py-4 whitespace-nowrap  ">
                                <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                </td>


                                <td className="px-4 py-4 whitespace-nowrap text-sm ">

                                <select className="text-black" onChange={(e)=>setRank(e.target.value)}>
                                  {
                                    professorsWithRanks.map((rank) => (
                                      <option key={rank.id} value={rank.name}>
                                        {rank.name}
                                      </option>
                                    ))
                                  }
                                </select>

                                {/* <input type="text" value={rank} onChange={(e)=>setRank(e.target.value)}></input> */}


                                </td>

                                {/* <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                <input type="text" value={year} onChange={(e)=>setYear(e.target.value)}></input>
                                </td> */}

                                <td className="px-4 py-4 whitespace-nowrap text-sm   ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleUpdate(row._id)}>update</button>
                                </div>
                                </td>

                         </tr>   

                        )
                        )
                    }


                  </tbody>




                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Committee;





