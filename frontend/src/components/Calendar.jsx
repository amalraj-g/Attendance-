import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const MyCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  
  
const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/details/remark/");
      const collectionData = response.data;
      const dailyDurations = {};

      const formattedEvents = collectionData
        .map((responseData, index) => {
          console.log(responseData);

          const developed = moment(
            moment(
              `${responseData.Date} ${responseData.Entrytime} `,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          console.log(developed);
          const developedDate = moment(developed).format("YYYY-MM-DD");
          console.log(developedDate);

          const developedStart = moment(
            moment(
              `${responseData.Date} ${responseData.Entrytime}`,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          const developedEntry = moment(developedStart).format("HH:mm:ss");

          const developedEnd = moment(
            moment(
              `${responseData.Date} ${responseData.Exittime}`,
              "MM/DD/YYYY HH:mm:ss"
            ).toDate()
          ).toISOString();
          const developedExit = moment(developedEnd).format("HH:mm:ss");

          const developedEntryMoment = moment(developedEntry, "HH:mm:ss");
          const developedExitMoment = moment(developedExit, "HH:mm:ss");

          const duration = moment.duration(
            developedExitMoment.diff(developedEntryMoment)
          );

          const dateKey = moment(developedEntryMoment).format("YYYY-MM-DD");
          dailyDurations[dateKey] = (dailyDurations[dateKey] || 0) + duration.asHours();
  
          // Extract hours, minutes, and seconds from the duration
          const hours = duration.hours();
          const minutes = duration.minutes();
          const seconds = duration.seconds();

          const durationString = `Total hrs: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

          console.log(`Time difference: ${durationString}`);
         
         

          const checkin = `In  : ${developedEntry}`;
          const checkout = `Out : ${developedExit}`;
          return [
            {
              id: responseData._id,
              title: checkin,
              start: new Date(developed),
              end:new Date(developed),
              color: generateEventColor(index),
            },
            {
              id: responseData._id,
              title: checkout,
              start: new Date(developed),
              end: new Date(developed),
              color:generateToCenterEventColor(index),
            },
            {
              id: responseData._id,
              title: durationString,
              start: new Date(developed),
              end: new Date(developed),
              color: generateToEventColor(index),
            },
          ];
        })
        .flat();
        const monthlyTotalHours = Object.values(dailyDurations).reduce((total, dailyTotal) => total + dailyTotal, 0);
        setTotalHours(monthlyTotalHours);
        
        

      setEvents(formattedEvents);

      
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
      console.log(events);
    }, [events]);
    
  const generateEventColor = (index) => {
    const colors = ["#CD8D7A"];
    return colors[index % colors.length];
  };
  const generateToCenterEventColor = (index) => {
    const colors = ["#F9B572"];
    return colors[index % colors.length];
  };
  const generateToEventColor = (index) => {
    const colors = ["#7EAA92"];
    return colors[index % colors.length];
  };
 

  
  const createData = async () => {
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

      const checkin = `In  : ${developedEntry}`;
      const checkout = `Out : ${developedExit}`;

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: checkin,
          start: new Date(developed),
          end: new Date(developed),
        },
        {
          id: responseData._id,
          title: checkout,
          start:new Date(developed),
          end: new Date(developed),
        },
      ];

      setEvents(calendarFormattedEvents);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };

  useEffect(() => {
    createData();
  }, []);

  
 

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

      const checkin = `In  : ${developedEntry}`;
      const checkout = `Out : ${developedExit}`;

      const calendarFormattedEvents = [
        {
          id: responseData._id,
          title: checkin,
          start: new Date(developed),
          end: new Date(developed),
        },
        {
          id: responseData._id,
          title: checkout,
          start:new Date(developed),
          end: new Date(developed),
        },
      ];

      // console.log(calendarFormattedEvents.id);
      // console.log(calendarFormattedEvents.title);

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
      <Button class="btn" onClick={createData}>
        checkIn
      </Button>
       <div class="spacer"></div>
       <Button class="btn" onClick={implementData}>
         checkOut
      </Button>
      <div>Total hours for the month: {Math.floor(totalHours)} hours {(totalHours % 1 * 60).toFixed(0)} minutes</div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
        eventPropGetter={(event) => ({
          style: { backgroundColor: event.color },
        })}
      />
      
     
    </div>
  );
};

export default MyCalendar;




