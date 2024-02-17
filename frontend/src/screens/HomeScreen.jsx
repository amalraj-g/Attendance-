import React, { useState } from "react";

import Attendance from "../components/Attendance";
import MyCalendar from "../components/Calendar";

const HomeScreen = () => {

  

  
  
  return (
    <>
      <h1>Time tracker</h1>
     
     <Attendance/> 

     <MyCalendar  />
       
   </>
  );
};

export default HomeScreen