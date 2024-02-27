import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import App from './App';
import './index.css';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashBoardScreen from "./screens/DashBoardScreen";
//import { BarChart } from './components/BarChart';
import reportWebVitals from './reportWebVitals';
//import { Provider } from "react-redux";
import "./assets/styles/bootstrap.custom.css";
//import store from "./store.js";
import registerServiceWorker from './registerServiceWorker';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/home" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} /> 
      <Route path="/dashboard" element={<DashBoardScreen />} /> 
    </Route>
    ))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
   
  </React.StrictMode>
);


reportWebVitals();
registerServiceWorker();


