import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import profileSlice from "../../Components/reducer/slices/profileSlice";
import { deletefaculty_api, faculty_api, facultyid_api, updatefaculty_api } from "../../services/apis";




const Faculty = () => {

  const [data, setData] = useState([]);
  const {user}= useSelector( (state) => state.profile);

  const [editId, setEditId] = useState(-1);

  const [name, setName] = useState("");
  const [currentRank, setCurrentRank] = useState("");
  const [startDate, setStartDate] = useState("");
  const [teaching, setTeaching] = useState(0);
  const [research, setResearch] = useState(0);
  const [service, setService] = useState(0);
  const [studentEvaluation, setStudentEvaluation] = useState(0);
  const [course, setCourse] = useState(0);
  const [teachingStudentMentor, setTeachingStudentMentor] = useState(0);
  const [notes, setNotes] = useState("");
  const [overall, setOverall] = useState(0);
  const [publications, setPublications] = useState(0);
  const [researchFunding, setResearchFunding] = useState(0);
  const [researchStudentMentor, setResearchStudentMentor] = useState(0);
  const [notes2, setNotes2] = useState("");
  const [overall2, setOverall2] = useState(0);
  const [internal, setInternal] = useState(0);
  const [external, setExternal] = useState(0);
  const [notes3, setNotes3] = useState("");
  const [overall3, setOverall3] = useState(0);
  const [weightedTotal, setWeightedTotal] = useState(0);
  const [assignment, setAssignment] = useState("");




  const fetchData = async () => {
    try {
      const rank= "Asst Professor"
      const response = await axios.get(faculty_api);
      console.log(response)
      setData(response.data.body);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


 function handleEdit(id) {
    axios
      .get(`${facultyid_api}/${id}`)
      .then((res) => {
        const resDataValue = res.data.value;
        // Set each state individually
        setName(resDataValue.name);
        setCurrentRank(resDataValue.currentRank);
        setStartDate(resDataValue.startDate );
        setTeaching(resDataValue.teaching);
        setResearch(resDataValue.research);
        setService(resDataValue.service);
        setStudentEvaluation(resDataValue.studentEvaluation);
        setCourse(resDataValue.course);
        setTeachingStudentMentor(resDataValue.teachingStudentMentor);
        setNotes(resDataValue.notes);
        setOverall(resDataValue.overall);
        setPublications(resDataValue.publications);
        setResearchFunding(resDataValue.researchFunding);
        setResearchStudentMentor(resDataValue.researchStudentMentor);
        setNotes2(resDataValue.notes2);
        setOverall2(resDataValue.overall2);
        setInternal(resDataValue.internal);
        setExternal(resDataValue.external);
        setNotes3(resDataValue.notes3);
        setOverall3(resDataValue.overall3);
        setWeightedTotal(resDataValue.weightedTotal);
        setAssignment(resDataValue.assignment);
      })
      .catch((err) => console.log("error"));

    setEditId(id);
  }

  async function handleUpdate(id) {

    console.log("are we inside handleupdate")
    try {
      await axios.put(`${updatefaculty_api}/${id}`, {
        name,
        currentRank,
        startDate,
        teaching,
        research,
        service,
        studentEvaluation,
        course,
        teachingStudentMentor,
        notes,
        overall,
        publications,
        researchFunding,
        researchStudentMentor,
        notes2,
        overall2,
        internal,
        external,
        notes3,
        overall3,
        weightedTotal,
        assignment,
      });
      setEditId(-1);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.post(`${deletefaculty_api}/${id}`);
      setEditId(-1);
      window.location.reload();
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



  return (
    <>
      <section className="  min-h-100vh px-4 mx-auto py-4 h-full">


        <div className="flex items-center justify-between">
          
          
        {/* <div className="flex gap-5">
          <label>Select Professor Rank:</label>
          <select onChange={handleRankChange}>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Research Professor">Research Professor</option>
            <option value="Teaching Professor">Teaching Professor</option>
          </select>
        </div> */}

          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Faculty
            </h2>
            <div className="text-lg font-medium text-gray-800 dark:text-white">Academic Year: 2023-2024</div>
          </div>


           <Link to={"/addfaculty"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Faculty
              </button>
            </div>
          </Link>


        </div>


        
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" table-container  overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700">



                  <thead className="bg-gray-50 dark:bg-gray-800 sticky-thead ">
                    <tr>



                      <th
                        scope="col"
                        className="py-3.5 px-4 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Name</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Current Rank
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Starting ASU
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Teaching
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Research
                      </th>



                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        Service
                      </th>



                      <th
                        scope="col"
                        className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Actions
                      </th>



                    </tr>
                  </thead>


































                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {
                        data.map((row, index) =>(

                            row._id!== editId ?

                         <tr key={row._id} className={index % 2 === 0 ? 'bg-richblack-900' :  'bg-gray-800'}>

                         <td className="py-4 px-4 whitespace-nowrap   text-gray-500 dark:text-gray-300 sticky-col">
                              {row.name}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
                              {row.currentRank}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
                              {row.startDate}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
                              {row.teaching}
                          </td>

                          {/* row.teaching !== undefined ? row.teaching : "0" */}


                          <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
                              {row.research}
                          </td>

                         <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
                              {row.service}
                          </td>


                                <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300 ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleEdit(row._id)}>edit</button>
                                    <button onClick={()=>handleDelete(row._id)}>delete</button>
                                </div>
                                </td>
                                </tr>


                        :











































                        <tr key={row._id}  className={index % 2 === 0 ? 'bg-richblack-900' :  'bg-gray-800'}>

                            <td className="py-4 px-4 whitespace-nowrap ">
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">

                            <select onChange={(e) => setCurrentRank(e.target.value)}>
                                  {
                                    professorsWithRanks.map((rank) => (
                                      <option key={rank.id} value={rank.name}>
                                        {rank.name}
                                      </option>
                                    ))
                                  }
                                </select>


                              {/* <input
                                type="text"
                                value={currentRank}
                                onChange={(e) => setCurrentRank(e.target.value)} */}



                              
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={teaching}
                                onChange={(e) => setTeaching(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={research}
                                onChange={(e) => setResearch(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={service}
                                onChange={(e) => setService(parseInt(e.target.value))}
                              />
                            </td>


                            <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300 ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleUpdate(row._id)}>Update</button>
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













  // return (
  //   <>
  //     <section className="container px-4 mx-auto py-4">




  //       <div className="flex items-center justify-between">


  //         <div>
  //           <h2 className="text-lg font-medium text-gray-800 dark:text-white">
  //           Faculty
  //           </h2>
  //           <p className="mt-1 text-lg text-gray-500 dark:text-gray-300">
  //             This is a list of all Faculty. You can add new Faculty, edit
  //             or delete existing ones.
  //           </p>
  //         </div>


  //       { user === "Admin" &&  <Link to={"/addemployee"}>
  //           <div>
  //             <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-lg font-semibold leading-7 text-white hover:bg-indigo-500 ">
  //               Add Faculty
  //             </button>
  //           </div>
  //         </Link>}


  //       </div>








  //       <div className="flex flex-col mt-6 w-full">
  //         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  //           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
  //             <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

  //               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">



  //                 <thead className="bg-gray-50 dark:bg-gray-800">
  //                   <tr>
  //                     <th
  //                       scope="col"
  //                       className="py-3.5 px-4 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       <span>Name</span>
  //                     </th>
  //                     <th
  //                       scope="col"
  //                       className="px-12 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Current Rank
  //                     </th>

  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Start Date
  //                     </th>

  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Teaching
  //                     </th>

  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Research
  //                     </th>

  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Service
  //                     </th>

  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Edit Button
  //                     </th>


  //                     <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Delete Button
  //                     </th>


  //                     {/* <th
  //                       scope="col"
  //                       className="px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
  //                     >
  //                       Notes
  //                     </th> */}


  //                   </tr>
  //                 </thead>



  //                 <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
  //                   {data.map((row) => (
  //                     <tr key={row._id}>

  //                       <td className="py-4 px-4 whitespace-nowrap">
  //                         <input value={row.name} className="text-lg text-gray-500 dark:text-gray-300"></input>
  //                       </td>


  //                       <td className="px-12 py-4 whitespace-nowrap">
  //                         {row.currentRank}
  //                       </td>


  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
  //                         {row.startDate}
  //                       </td>

  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
  //                         {row.teaching}
  //                       </td>

  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
  //                         {row.research}
  //                       </td>

  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
  //                         {row.service}
  //                       </td>

  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300 cursor-pointer">
  //                         <button>
  //                           Edit/submit
  //                         </button>
  //                       </td>

  //                       <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300 cursor-pointer">
  //                         <button onClick={()=>deleteButton(row._id)}>
  //                           Delete
  //                         </button>
  //                       </td>

  //                       {/* <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500 dark:text-gray-300">
  //                         {row.notes}
  //                       </td> */}




  //                     </tr>
  //                   ))}
  //                 </tbody>




  //               </table>
  //             </div>
  //           </div>
  //         </div>
  //       </div>


  //     </section>
  //   </>
  // );
};

export default Faculty;





