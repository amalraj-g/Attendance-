import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import AttendanceRoutes from './routes/AttendanceRoutes.js';

const port =process.env.PORT||3001;

connectDB();

const app = express();
const value='30mb';

const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
app.use(cors(corsOptions))
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/details',  AttendanceRoutes);

app.use(bodyParser.json({ limit: value, extended: true }));
app.use(bodyParser.urlencoded({ limit: value, extended: true }));



app.listen(port, ()=>{
    console.log(`server running on port: ${port}`)
});