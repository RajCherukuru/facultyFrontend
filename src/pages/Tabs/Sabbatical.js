import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import profileSlice from "../../Components/reducer/slices/profileSlice";
import { deletesabbatical_api, sabbatical_api, sabbaticalid_api, updatesabbatical_api } from "../../services/apis";
import { RowColour } from "../../utils/RowColour";




const Sabbatical = () => {

  const [data, setData] = useState([]);
  const {user}= useSelector( (state) => state.profile);
  const [editId, setEditId] = useState(-1);
  
  const {colour}= useSelector( (state) => state.colour);


  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentRank, setCurrentRank] = useState("");


  const fetchData = async () => {

    try {
      const response = await axios.get(sabbatical_api);
      console.log(response.data.body);
      setData(response.data.body);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  },[]);



  function handleEdit(id) {
    axios
      .get(`${sabbaticalid_api}/${id}`)
      .then((res) => {
        const resDataValue = res.data.value;
        // Set each state individually
        setName(resDataValue.name);
        setStartDate(resDataValue.startDate );
        setEndDate(resDataValue.endDate );
        setCurrentRank(resDataValue.currentRank );

        
      })
      .catch((err) => console.log("error"));

    setEditId(id);
  }


  async function handleUpdate(id) {

    console.log("are we inside handleupdate")
    try {
      await axios.put(`${updatesabbatical_api}/${id}`, {
        name,
        startDate,
        endDate,
        currentRank
      });
      setEditId(-1);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.post(`${deletesabbatical_api}/${id}`);
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
      <section className="px-4 mx-auto py-4 h-full min-h-100vh">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium  dark:text-white">
            Faculty
            </h2>
            <div className="text-lg font-medium  dark:text-white">Academic Year: 2023-2024</div>
            <p className="mt-1 text-sm  dark:text-gray-300">
              This is a list of all Faculty. You can add new Faculty, edit
              or delete existing ones.
            </p>
          </div>


           { user === "Staff" && <Link to={"/addsabbatical"}>
            <div>
              <button className="rounded-md bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold leading-7 text-white hover:bg-indigo-500 ">
                Add Sabbatical Faculty
              </button>
            </div>
          </Link>}


        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className=" table-container overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">



                  <thead className={`bg-gray-50 dark:bg-gray-800 sticky-thead ${colour==="dark"? "color": "color-light"}`}>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right  "
                      >
                        <span>Name</span>
                      </th>


                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  "
                      >
                        Start Date
                      </th>


                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  "
                      >
                        End Date
                      </th>


                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  "
                      >
                        Current Rank
                      </th>



                     { user!== "Committee" && <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right  "
                      >
                        Actions
                      </th>}



{/* 
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right  "
                      >
                        Academic Year
                      </th> */}
                    </tr>
                  </thead>



                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    


                    {data.map((row, index) => (

                      row._id!== editId ?

                      <tr key={row._id} className={RowColour(colour, index)}>

                        <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                          {row.name}
                        </td>


                        <td className="px-12 py-4     whitespace-nowrap">
                          {row.startDate}
                        </td>

                        <td className="px-12 py-4   whitespace-nowrap">
                          {row.endDate}
                        </td>

                        <td className="px-12 py-4   whitespace-nowrap">
                          {row.currentRank}
                        </td>


                        {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {row.academicYear}
                        </td> */}


                        { user !== "Committee" && <td className="px-4 py-4 whitespace-nowrap text-sm  ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleEdit(row._id)}>edit</button>
                                    <button onClick={()=>handleDelete(row._id)}>delete</button>
                                </div>
                                </td>}




                      </tr>

                      :




                      <tr key={row._id} className={RowColour(colour, index)}>

                        <td className={`py-4 px-4 whitespace-nowrap   ${colour==="dark"? "sticky-col" : "sticky-col-light"}`}>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
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
                            type="text"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
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
                        </td>

                          <td className="px-4 py-4 whitespace-nowrap text-sm   ">
                                <div className="flex gap-3">
                                    <button onClick={()=>handleUpdate(row._id)}>Update</button>
                                </div>
                                </td>


                        </tr>   







                    ))}
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

export default Sabbatical;





