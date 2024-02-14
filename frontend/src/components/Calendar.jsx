import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
 

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Default Event 1",
      start: new Date(),
      end: moment().toDate(), 
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5001/details/remark");
      const responseData = response.data; 

      console.log(responseData);
      const calendarFormattedEvents = {
        id: responseData._id,
        title: "Attendance:",
        start: moment(
          `${responseData.Date} ${responseData.Entrytime}`,
          "MM/DD/YYYY HH:mm:ss" ).toDate(),
        end: responseData.Exittime
          ? null
          : moment(`${responseData.Date} ${responseData.Exittime}`,
          "MM/DD/YYYY HH:mm:ss").toDate(),
      };

      setEvents([calendarFormattedEvents]);
      console.log(calendarFormattedEvents);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}


        
      />
    </div>
  );
};

export default MyCalendar;
