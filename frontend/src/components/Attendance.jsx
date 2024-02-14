import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button} from "react-bootstrap";
import axios from 'axios'; 


const Attendance = ( ) => {
  

  const onCheckInHandler = async () => {
    try {

     const response = await axios.post('http://localhost:5001/details/remark')
         if (response.status !== 201) {
            throw new Error('Failed to create data');
          }
           const responseData = response.data;
           console.log('AttendanceData created:', responseData);
           localStorage.setItem('id',responseData._id );
          
        } catch (error) {
        console.error(error);
      }
  };

  const onCheckOutHandler = async () => {
    
      try {
        const storedId = localStorage.getItem('id');
        console.log(storedId)
       
          const response = await axios.put(`http://localhost:5001/details/remark/${storedId}`)
              if (response.status !== 201) {
                throw new Error('Failed to create data');
              }
    
              const responseData = response.data;
              console.log('Data implemented:', responseData);
            } catch (error) {
            console.error(error);
          }
}
     
    
return (
    <>
   
      <Button  class="btn" onClick={onCheckInHandler} >checkIn</Button>
      <div class="spacer"></div>
      <Button  class="btn" onClick={onCheckOutHandler}>checkOut</Button> 
    </>
  )
    }
export default Attendance;












 

