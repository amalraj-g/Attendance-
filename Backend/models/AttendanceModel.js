import mongoose from "mongoose";


// import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    Name: {
      type: String,
    },
    Date: {
      type: String,
      default: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
    Entrytime: {
      type: String,
      default: new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    },
    Exittime: {
        type: String,
        default: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      },
  });
  
  const Attendance = mongoose.model('Attendance', Schema);
  
  export default Attendance;
  

