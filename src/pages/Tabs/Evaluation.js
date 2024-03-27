import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authSlice from "../../Components/reducer/slices/authSlice";
import { useSelector } from "react-redux";
import profileSlice from "../../Components/reducer/slices/profileSlice";
import { assignmentid_api, deleteassignment_api, filterevaluation_api, updateassignment_api } from "../../services/apis";
import { RowColour } from "../../utils/RowColour";


const Evaluation = () => {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(-1);

  const {token}= useSelector( (state) => state.auth);
  const {user}= useSelector( (state) => state.profile);

  const {colour}= useSelector( (state) => state.colour);

  



  // Separate states for each form field
  const [name, setName] = useState("");
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
        console.log(token)
      const response = await axios.get(`${filterevaluation_api}/${filterRank}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
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

  const [filterRank, setFilterRank]= useState("Assistant Professor");

  async function handleDelete(id) {
    try {
      await axios.post(`${deleteassignment_api}/${id}`);
      setEditId(-1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleFilter(rank){
    try {

      const d= rank;
      const response = await axios.get(`${filterevaluation_api}/${rank}`, {
        headers:{
            Authorization: `Bearer ${token}`
        }
      });
      console.log(response)

      if(d === "Assistant Professor" || d === "Associate Professor" || d === "Professor"){
        setResearchCategory(true);
        setServiceCategory(true);
      }
      if(d === "Research Faculty"){
        setTeachingFilter(false);
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

  const [teachingFilter, setTeachingFilter]= useState(true);
  const [researchFilter, setResearchFilter]= useState(false);
  const [serviceFilter, setServiceFilter]= useState(false);


  function handleCategoryChange(value){
    
    if(value == "Teaching"){
      setTeachingFilter(true);
      setResearchFilter(false);
      setServiceFilter(false);
    }

    if(value == "Research"){
      setTeachingFilter(false);
      setResearchFilter(true);
      setServiceFilter(false);
    }

    if(value == "Service"){
      setTeachingFilter(false);
      setResearchFilter(false);
      setServiceFilter(true);
    }

  }
  


  return (
    <>
      <section className=" px-4 mx-auto py-4 h-full min-h-100vh ">


        <div className="flex items-center justify-between">



        <div className="flex flex-col gap-2 place">

        <div className="flex gap-5 place-items-center ">
          <label className=" label-font">Select Professor Rank:</label>
          <select className=" rounded-md bg-indigo-600 px-3.5 py-1.5 h-10 text-sm font-semibold leading-7 text-white hover:bg-indigo-500" onChange={handleRankChange}>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Professor">Professor</option>
            <option value="Research Faculty">Research Faculty</option>
            <option value="Teaching Faculty">Teaching Faculty</option>
          </select>

          {/* <select className="select-font text-black" onChange={handleCategoryChange}>
            <option value="Teaching">Teaching</option>
            <option value="Research">Research</option>
            <option value="Service">Service</option>
          </select> */}


        </div>

            <div className=" text-xl">0 = unsatisfactory, 1 = satisfactory, 2 = good, 3 = excellent, 4 = superior</div>

            <div>
            <a className="text-blue-600 underline text-xl" href="https://arizonastateu.sharepoint.com/:f:/r/sites/O365FSESCAIFaculty-PersonnelCommitteeActions/Shared%20Documents/SCAI%20Personnel%20Committee%20Actions/Annual%20Evaluations/2023%20ASU%20Vita%20Review%20Materials?csf=1&web=1&e=JBeRze"
            target="_blank">
          Additional Materials</a>
            </div>

        </div>



        <div className="flex gap-5 mx-auto ">
              {filterRank!=="Research Faculty" && <button onClick={()=>handleCategoryChange("Teaching")} className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Teaching
              </button>}

              {filterRank!=="Teaching Faculty" && <button onClick={()=>handleCategoryChange("Research")} className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Research
              </button>}

              {filterRank!=="Research Faculty" && <button onClick={()=>handleCategoryChange("Service")} className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Service
              </button>}
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



                <thead className={` ${colour==="dark" ? "actual-head": "actual-head-light" } `}>
                    <tr>



                      <th
                        scope="col"
                        colSpan="6"
                        className="py-3.5 px-4 text-sm font-bold border-2  text-center rtl:text-right "
                      >
                        <span>Faculty Information</span>
                      </th>


                    { teachingFilter &&  <th
                        scope="col"
                        colSpan="5"
                        className="px-4 py-3.5 text-sm font-bold border-2  text-center rtl:text-right "
                      >
                        Teaching
                      </th>}


                      {
                     reserachCategory && researchFilter &&  <th
                        scope="col"
                        colSpan="5"
                        className="px-4 py-3.5 text-sm font-bold border-2  text-center rtl:text-right "
                      >
                        Research
                      </th>}



                    {serviceCategory && serviceFilter && <th
                      scope="col"
                      colSpan="4"
                      className="px-4 py-3.5 text-sm font-bold border-2  text-center rtl:text-right "
                    >
                      Service
                    </th>}

                    <th
                        scope="col"
                        colSpan="2"
                        className="px-4 py-3.5 text-sm font-bold border-2  text-center rtl:text-right "
                      >
                        Results
                      </th>


                    </tr>
                 </thead> 




                  <thead className={`bg-gray-50 dark:bg-gray-800 sticky-thead ${colour==="dark"? "color": "color-light"}`}>
                    <tr>



                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right   "
                      >
                        <span>Name</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Current Rank
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Starting ASU
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Teaching
                      </th>


                     <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Research
                      </th>



                     <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Service
                      </th>


                     { teachingFilter && <>
                     <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right   "
                      >
                        <span>Student Evaluation</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Courses
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Students mentoring
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Notes
                      </th>



                      <th
                        scope="col"
                        className="py-3.5  px-4 text-sm font-bold text-left rtl:text-right   "
                      >
                        <span className="font-extrabold text-orange-400">Overall</span>
                      </th>
                      </>
                      }


                     { 
                      
                       reserachCategory && researchFilter && (<>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Publications/ Other IP
                      </th>



                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Research funding
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        PhD students mentoring
                      </th>


                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-bold text-left rtl:text-right   "
                      >
                        <span>Notes</span>
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-extrabold text-left rtl:text-right text-orange-400 dark:text-gray-400"
                      >
                        Overall
                      </th>
                      </>)
                        }


                       { serviceCategory && serviceFilter && (<>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Internal
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        External
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Notes
                      </th>

                     

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-extrabold text-left rtl:text-right text-orange-400 dark:text-gray-400"
                      >
                        Overall
                      </th>

                      </>)}



                     
                    

                       




                      {/* <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Assignment
                      </th> */}


                      <th
                      scope="col"
                      className={ `px-4 py-3.5 text-sm font-bold text-left rtl:text-right text-orange-400 dark:text-gray-400` }
                      style={{ backgroundColor: 'rgb(34, 34, 34)' }}

                    >
                      Weighted Total
                    </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-bold text-left rtl:text-right   "
                      >
                        Actions
                      </th>



                    </tr>
                  </thead>


































                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {
                        data.map((row, index) =>(

                            row._id!== editId ?

                         <tr key={row._id} className={RowColour(colour, index)}>

                         <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                         <a className="text-blue-600 underline" href={row.link} target="_blank">{row.name}</a>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.currentRank}
                          </td>

                          <td className="px-4 py-4 w-12 overflow-hidden text-sm  ">
                              {row.startingAsu}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.teaching}
                          </td>


                           <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.research}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.service}
                          </td>


                         { teachingFilter && <>
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.studentEvaluation}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.course}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.teachingStudentMentor}
                          </td>

                          <td className="px-4 py-4  text-sm  ">
                              <div className="h-16 overflow-hidden hover:h-full">{row.notes}</div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap font-extrabold text-sm text-orange-400 dark:text-gray-300">
                              {row.overall}
                          </td>
                          </>
                              }
                          { reserachCategory && researchFilter && (<>
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.publications}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.researchFunding}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.researchStudentMentor}
                          </td>

                          <td className="px-4 py-4  text-sm  ">
                          <div className="h-16 overflow-hidden hover:h-full">{row.notes2}</div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap font-extrabold text-sm text-orange-400 dark:text-gray-300">
                              {row.overall2}
                          </td>
                          </>)}


                            {serviceCategory && serviceFilter && (<>
                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.internal}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.external}
                          </td>

                          <td className="px-4 py-4 overflow-hidden text-sm  ">
                            <div className="h-16 overflow-hidden hover:h-full">{row.notes3}</div>
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap font-extrabold text-sm text-orange-400 dark:text-gray-300">
                              {row.overall3}
                          </td>

                          </>)}

                          <td className="px-4 py-4 whitespace-nowrap font-extrabold text-sm text-orange-600 dark:text-gray-300">
                              {row.weightedTotal}
                          </td>

                          {/* <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.assignment}
                          </td> */}


                                <td className="px-4 py-4 whitespace-nowrap text-sm   ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleEdit(row._id)}>edit</button>
                                    {/* <button onClick={()=>handleDelete(row._id)}>delete</button> */}
                                </div>
                                </td>
                                </tr>


                        :











































                       

                        <tr key={row._id} className={RowColour(colour, index)}>



                        <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                              {row.name}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.currentRank}
                          </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.startingAsu}
                          </td>


                                {/* <td className="py-4 px-4 whitespace-nowrap sticky-col">
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


                                

                                


                                <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                {row.teaching}
                            </td>
  
  
                             <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                {row.research}
                            </td>
  
                            <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                {row.service}
                            </td>





                                

                              { teachingFilter && <>  <td className="py-4 px-4 whitespace-nowrap">
                                  <input className="w-20"
                                    type="number"
                                    min={0}
                                    max={4}
                                    value={studentEvaluation}
                                    onChange={(e) => {
                                      const newValue = parseFloat(e.target.value);
                                      if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                        setStudentEvaluation(newValue);
                                      }
                                    }}
                                  />
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap">
                                  <input className="w-20"
                                    type="number"
                                    min={0}
                                    max={4}
                                    value={course}
                                    onChange={(e) => {
                                      const newValue = parseFloat(e.target.value);
                                      if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                        setCourse(newValue);
                                      }
                                    }}
                                  />
                                </td>

                                <td className="py-4 px-4 whitespace-nowrap">
                                  <input className="w-20"
                                    type="number"
                                    min={0}
                                    max={4}
                                    value={teachingStudentMentor}
                                    onChange={(e) => {
                                      const newValue = parseFloat(e.target.value);
                                      if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                        setTeachingStudentMentor(newValue);
                                      }
                                    }}
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
                                  <input className="w-20"
                                    type="number"
                                    min={0}
                                    max={4}
                                    value={overall}
                                    onChange={(e) => {
                                      const newValue = parseFloat(e.target.value);
                                      if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                        setOverall(newValue);
                                      }
                                    }}
                                  />
                                </td>
                                </>
                                }

                                {reserachCategory && researchFilter && <>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={publications}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setPublications(newValue);
                                        }
                                      }}
                                    />
                                  </td>

                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={researchFunding}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setResearchFunding(newValue);
                                        }
                                      }}
                                    />
                                  </td>

                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={researchStudentMentor}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setResearchStudentMentor(newValue);
                                        }
                                      }}
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
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={overall2}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setOverall2(newValue);
                                        }
                                      }}
                                    />
                                  </td>
                                </>}

                                { serviceCategory && serviceFilter && <>
                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={internal}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setInternal(newValue);
                                        }
                                      }}
                                    />
                                  </td>

                                  <td className="py-4 px-4 whitespace-nowrap">
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={external}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setExternal(newValue);
                                        }
                                      }}
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
                                    <input className="w-20"
                                      type="number"
                                      min={0}
                                      max={4}
                                      value={overall3}
                                      onChange={(e) => {
                                        const newValue = parseFloat(e.target.value);
                                        if (!isNaN(newValue) && newValue >= 0 && newValue <= 4) {
                                          setOverall3(newValue);
                                        }
                                      }}
                                    />
                                  </td>
                                  </>
                                  }

                            

                            {/* <td className="py-4 px-4 whitespace-nowrap">
                              <input
                                type="text"
                                value={assignment}
                                onChange={(e) => setAssignment(e.target.value)}
                              />
                            </td> */}


                            <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                              {row.weightedTotal}
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

export default Evaluation;





