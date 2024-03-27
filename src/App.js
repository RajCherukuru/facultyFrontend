import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NavBar from "./pages/NavBar";import { useState } from "react";
import Faculty from "./pages/Tabs/Faculty";
import Committee from "./pages/Tabs/Committee";
import Sabbatical from "./pages/Tabs/Sabbatical"
import Assignments from "./pages/Tabs/Assignments";
import CreateAssignmentPage from "./pages/CreatePages/CreateAssignmentPage";
import CreateCommitteePage from "./pages/CreatePages/CreateCommitteePage";
import Evaluation from "./pages/Tabs/Evaluation"
import PrivateRoute from "./services/PrivateRoute";
import Aggregate from "./pages/Tabs/Aggregate";
import CreateFacultyPage from "./pages/CreatePages/CreateFaculty";
import CreateSabbaticalPage from "./pages/CreatePages/CreateSabbatical";
import { useSelector } from "react-redux";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";



function App() {

  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const {user}= useSelector( (state) => state.profile);
  const {colour}= useSelector( (state) => state.colour);


  return ( 
 <div className={`w-[100vw] h-[100vh] flex flex-col gap-6 ${colour=="dark" ? "dark" : "light"}`}>



      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>

      <Routes>

        <Route path="/" element={<Home></Home>} ></Route>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Login>} ></Route>
        <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Signup>} ></Route>
        
        <Route path="/forgotpassword" element={<ForgotPassword></ForgotPassword>} ></Route>
        <Route path="update-password/:id" element={<UpdatePassword></UpdatePassword>} ></Route>


        

        <Route path="/addassignment" element={<CreateAssignmentPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CreateAssignmentPage>} ></Route>
        <Route path="/addcommittee" element={<CreateCommitteePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CreateCommitteePage>} ></Route>
        <Route path="/addfaculty" element={<CreateFacultyPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CreateFacultyPage>} ></Route>
        <Route path="/addsabbatical" element={<CreateSabbaticalPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></CreateSabbaticalPage>} ></Route>



{/* 
        <Route
          element={
            <PrivateRoute>
                <Faculty isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Faculty>
                <Sabbatical isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sabbatical>
                <Committee isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Committee>
                <Assignments isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Assignments>
                <Evaluation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Evaluation>
            </PrivateRoute>
          }
        />  */}

        {/* <Route path="/faculty" element={<Faculty isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Faculty>} ></Route> 
        <Route path="/sabbatical" element={<Sabbatical isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Sabbatical>} ></Route>
        <Route path="/committee" element={<Committee isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Committee>} ></Route>
        <Route path="/assignments" element={<Assignments isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Assignments>} ></Route>
        <Route path="/evaluation" element={<Evaluation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Evaluation>} ></Route> */}




        <Route path="/faculty" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Faculty></Faculty></PrivateRoute>} ></Route>

        <Route path="/sabbatical" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Sabbatical></Sabbatical></PrivateRoute>} ></Route>

        <Route path="/committee" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Committee></Committee></PrivateRoute>} ></Route>

        <Route path="/assignments" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Assignments></Assignments></PrivateRoute>} ></Route> 

         <Route path="/evaluation" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Evaluation></Evaluation></PrivateRoute>} ></Route>   

        <Route path="/aggregate" element=
        {<PrivateRoute isLoggedIn={isLoggedIn} ><Aggregate></Aggregate></PrivateRoute>} ></Route> 

       


      </Routes>



    
  
    
  
  
  </div>
  );
}

export default App;
