import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

import Navbar from "./navbar/Navbar";

import HomeworkList from "./components/HomeworkList";
import HomeworkUpload from "./components/HomeworkUpload";
import MySubmissions from "./components/MySubmissions";
import AllSubmissions from "./components/AllSubmissions";
import CreateHomework from "./components/CreateHomework";
import LatestHomework from "./components/LatestHomework"; // ✅ added this import

function App() {
  
  return (
   
    <Router>
    <Navbar/>
   
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/home" element={<Home />} />
         <Route path="/createhomework" element={<CreateHomework/>} />
         <Route path="/homeworklist" element={<HomeworkList />} />
         <Route path="/latesthomework" element={<LatestHomework/>} />
          <Route path="/hmupload" element={<HomeworkUpload/>} />
           <Route path="/allsubmission" element={<AllSubmissions/>} />
            <Route path="/mysubmission" element={<MySubmissions/>} />
         
         

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
