import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authSlice from "../../Components/reducer/slices/authSlice";
import { useSelector } from "react-redux";
import profileSlice from "../../Components/reducer/slices/profileSlice";
import { assignmentid_api, deleteassignment_api, filterassignment_api, updateassignment_api } from "../../services/apis";
import { RowColour } from "../../utils/RowColour";



const Assignments = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(-1);

  const {token}= useSelector( (state) => state.auth);
  const {user}= useSelector( (state) => state.profile);

  const {colour}= useSelector( (state) => state.colour);



  // Separate states for each form field
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const [currentRank, setCurrentRank] = useState("");
  const [startingAsu, setStartingAsu] = useState("");
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


  const [reserachCategory, setResearchCategory]= useState(true);
  const [serviceCategory, setServiceCategory]= useState(true);



  const fetchData = async () => {
    try {
      const response = await axios.get(`${filterassignment_api}/${filterRank}`);
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
      .get(`${assignmentid_api}/${id}`)
      .then((res) => {
        const resDataValue = res.data.value;
        // Set each state individually
        setName(resDataValue.name);
        setLink(resDataValue.link)
        setCurrentRank(resDataValue.currentRank);
        setStartingAsu(resDataValue.startingAsu );
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
    try {
      await axios.put(`${updateassignment_api}/${id}`, {
        name,
        currentRank,
        startingAsu,
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
      await axios.post(`${deleteassignment_api}/${id}`);
      setEditId(-1);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilter(rank){
    try {

      const d= rank;
      const response = await axios.get(`${filterassignment_api}/${rank}`);
      console.log(response)

      if(d === "Assistant Professor" || d === "Associate Professor" || d === "Professor"){
        setResearchCategory(true);
        setServiceCategory(true);
      }
      if(d === "Research Faculty"){
        setResearchCategory(true);
        setServiceCategory(false);
      }
      if(d === "Teaching Faculty"){
        setResearchCategory(false);
        setServiceCategory(true);
      }
      setData(response.data.body);
    } catch (error) {
      console.log(error);
    }
  }

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
  


  const professors = [
    { id: 0, name: "Choose Assignment" },
    { id: 1, name: "Douglas Montgomery" },
    { id: 2, name: "Guoliang Xue" },
    { id: 3, name: "Hasan Davulcu" },
    { id: 4, name: "Hessam Sarjoughian" },
    { id: 5, name: "Paulo Shakarian" },
    { id: 6, name: "Rong Pan" },
    { id: 7, name: "Chitta Baral" },
    { id: 8, name: "Stephen Yau" }
  ];


  return (
    <>
      <section className=" min-h-100vh px-4 mx-auto py-4 h-full">


        <div className="flex items-center justify-between">
          
          
        <div className="flex gap-5 place-items-center">
          <label   className="label-font">Select Professor Rank:</label>
          <select className=" rounded-md bg-indigo-600 px-3.5 py-1.5 h-10 text-sm font-semibold leading-7 text-white hover:bg-indigo-500"  onChange={handleRankChange}>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Research Faculty">Research Faculty</option>
            <option value="Teaching Faculty">Teaching Faculty</option>
          </select>
        </div>


          { user === "Admin" && <Link to={"/addassignment"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Assignment
              </button>
            </div>
          </Link>}


        </div>


        
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" table-container overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">


{/* 
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>



                      <th
                        scope="col"
                        colSpan="6"
                        className="py-3.5 px-4 text-sm font-normal border-2  text-center rtl:text-right  "
                      >
                        <span>Faculty Information</span>
                      </th>


                      <th
                        scope="col"
                        colSpan="5"
                        className="px-4 py-3.5 text-sm font-normal border-2  text-center rtl:text-right  "
                      >
                        Teaching
                      </th>


                      {
                     reserachCategory &&  <th
                        scope="col"
                        colSpan="5"
                        className="px-4 py-3.5 text-sm font-normal border-2  text-center rtl:text-right  "
                      >
                        Research
                      </th>}



                    {serviceCategory && <th
                      scope="col"
                      colSpan="4"
                      className="px-4 py-3.5 text-sm font-normal border-2  text-center rtl:text-right  "
                    >
                      Service
                    </th>}


                    </tr>
                 </thead>  */}




                  <thead className={`bg-gray-50 dark:bg-gray-800 sticky-thead ${colour==="dark"? "color": "color-light"}`}>
                    <tr>



                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right  "
                      >
                        <span>Name</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Current Rank
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Starting ASU
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Teaching
                      </th>


                     { reserachCategory && <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Research
                      </th>}



                     { serviceCategory && <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Service
                      </th>}


                      {/* <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right  "
                      >
                        <span>Student Evaluation</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Course/program/teaching lab improvement
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Student mentoring (Except PhD Students)
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Notes
                      </th>



                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right  "
                      >
                        <span>Overall</span>
                      </th>


                     { 
                      
                       reserachCategory && (<>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Publications/ Other IP
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Research funding
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Student mentoring (PhD students)
                      </th>


                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right  "
                      >
                        <span>Notes2</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Overall 2
                      </th>
                      </>)
                        }


                       { serviceCategory && (<>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Internal
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        External
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Notes3
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Overall3
                      </th>

                      </>)}

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Weighted Total
                      </th> */}

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Assignment
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right  "
                      >
                        Actions
                      </th>



                    </tr>
                  </thead>


































                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {
                        data.map((row, index) =>(

                            row._id!== editId ?

                         <tr key={row._id}  className={RowColour(colour, index)}>

                         <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                         <a className="text-blue-600 underline" href={row.link}>{row.name}</a>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.currentRank}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.startingAsu}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.teaching}
                          </td>


                          { reserachCategory && <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.research}
                          </td>}

                          {serviceCategory && <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.service}
                          </td>}

{/* 
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.studentEvaluation}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.course}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.teachingStudentMentor}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.notes}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.overall}
                          </td>

                          { reserachCategory && (<>
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.publications}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.researchFunding}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.researchStudentMentor}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.notes2}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.overall2}
                          </td>
                          </>)}


                            {serviceCategory && (<>
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.internal}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.external}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.notes3}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.overall3}
                          </td>

                          </>)}

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.weightedTotal}
                          </td> */}

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.assignment}
                          </td>


                                <td className="px-4 py-4 whitespace-nowrap text-sm   ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleEdit(row._id)}>edit</button>
                                    <button onClick={()=>handleDelete(row._id)}>delete</button>
                                </div>
                                </td>
                                </tr>


                        :











































                        <tr key={row._id} className={RowColour(colour, index)}>

                        

                            {/* <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={currentRank}
                                onChange={(e) => setCurrentRank(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={startingAsu}
                                onChange={(e) => setStartingAsu(e.target.value)}
                              />
                            </td> */}

                            <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                              {row.name}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.currentRank}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.startingAsu}
                          </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={teaching}
                                onChange={(e) => setTeaching(parseInt(e.target.value))}
                              />
                            </td>

                            {reserachCategory && <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={research}
                                onChange={(e) => setResearch(parseInt(e.target.value))}
                              />
                            </td>}

                            {serviceCategory && <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={service}
                                onChange={(e) => setService(parseInt(e.target.value))}
                              />
                            </td>}

{/*                             
                              <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={studentEvaluation}
                                onChange={(e) => setStudentEvaluation(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={course}
                                onChange={(e) => setCourse(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={teachingStudentMentor}
                                onChange={(e) => setTeachingStudentMentor(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={overall}
                                onChange={(e) => setOverall(parseInt(e.target.value))}
                              />
                            </td> 

                            
                            { reserachCategory && <> 
                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={publications}
                                onChange={(e) => setPublications(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={researchFunding}
                                onChange={(e) => setResearchFunding(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={researchStudentMentor}
                                onChange={(e) => setResearchStudentMentor(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={notes2}
                                onChange={(e) => setNotes2(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={overall2}
                                onChange={(e) => setOverall2(parseInt(e.target.value))}
                              />
                            </td>

                            </>}




                            { serviceCategory && <><td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={internal}
                                onChange={(e) => setInternal(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={external}
                                onChange={(e) => setExternal(parseInt(e.target.value))}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={notes3}
                                onChange={(e) => setNotes3(e.target.value)}
                              />
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={overall3}
                                onChange={(e) => setOverall3(parseInt(e.target.value))}
                              />
                            </td> </>}

                            <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={weightedTotal}
                                onChange={(e) => setWeightedTotal(parseInt(e.target.value))}
                              />
                            </td> */}

                            <td className="py-4 px-4 whitespace-nowrap">

                            <select className="text-black" onChange={(e) => setAssignment(e.target.value)}>
                              {
                                professors.map((prof) => (
                                  <option key={prof.id} value={prof.name}>
                                    {prof.name}
                                  </option>
                                ))
                              }
                           </select>


                              {/* <input
                                type="text"
                                value={assignment}
                                onChange={(e) => setAssignment(e.target.value)}
                              /> */}


                            </td>

                            <td className="px-4 py-4 whitespace-nowrap text-sm   ">
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
};

export default Assignments;





