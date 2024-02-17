import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post("http://localhost:5001/details/remark");
      const responseData = response.data;

      localStorage.setItem("id", responseData._id);
      const developed = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime} `,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedDate = moment(developed).format("YYYY-MM-DD");
      console.log(developedDate);

      const developedstart = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedEntry = moment(developedstart).format("HH:mm:ss");

      const developedend = moment(
        moment(
          `${responseData.Date} ${responseData.Exittime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedExit = moment(developedend).format("HH:mm:ss");

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: "In  : " + developedEntry,
          start: developedstart,
          end: developedend,
        },
        {
          id: responseData._id,
          title: "Out : " + developedExit,
          start: developedstart,
          end: developedend,
        },
      ];

      setEvents(calendarFormattedEvents);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(events);
  }, [events]);
  // //console.log(calendarFormattedEvents.id);
  // console.log(events[0]?.title);
  // console.log(events.end);
  // console.log("hi");

 

  const implementData = async () => {
    try {
      const storedId = localStorage.getItem("id");
      const response = await axios.put(
        `http://localhost:5001/details/remark/${storedId}`
      );
      const responseData = response.data;

      // console.log(responseData);
      // console.log(responseData.Date);
      // console.log(responseData.Entrytime);
      // console.log(responseData.Exittime);

      const developed = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime} `,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedDate = moment(developed).format("YYYY-MM-DD");
      console.log(developedDate);

      const developedstart = moment(
        moment(
          `${responseData.Date} ${responseData.Entrytime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedEntry = moment(developedstart).format("HH:mm:ss");

      const developedend = moment(
        moment(
          `${responseData.Date} ${responseData.Exittime}`,
          "MM/DD/YYYY HH:mm:ss"
        ).toDate()
      ).toISOString();
      const developedExit = moment(developedend).format("HH:mm:ss");

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: "In  : " + developedEntry,
          start: developedstart,
          end: developedend,
        },
        {
          id: responseData._id,
          title: "Out : " + developedExit,
          start: developedstart,
          end: developedend,
        },
      ];


      console.log(calendarFormattedEvents.id);
      console.log(calendarFormattedEvents.title);

      setEvents(calendarFormattedEvents);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    implementData();
  }, []);

  
  
   return (
    <div>
      <Button class="btn" onClick={fetchData}>
        checkIn
      </Button>
      <div class="spacer"></div>
      <Button class="btn" onClick={implementData}>
        checkOut
      </Button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "80vh" }}
        // onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default MyCalendar;

