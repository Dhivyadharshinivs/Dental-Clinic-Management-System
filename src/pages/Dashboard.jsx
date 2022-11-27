import React from "react";
import "./dashboard.css";
import SingleCard from "./SingleCard";
import MileChart from "./MileChart";
import CarStatsChart from "./CarStatsChart";
 
 const carObj = {
   title: "Patients",
   totalNumber: 500,
   icon: "ri-police-car-line",
 };
 
 const tripObj = {
   title: "Number of Staffs",
   totalNumber: 5,
   icon: "ri-steering-2-line",
 };
 
 const clientObj = {
   title: "Monthly Income",
   totalNumber: "1L",
   icon: "ri-user-line",
 };
 
 const distanceObj = {
   title: "Latest Technology Equipments",
   totalNumber:"5" ,
   icon: "ri-timer-flash-line",
 };
 
 const Dashboard = () => {
   return (
    <>
     <h1>Admin Dashboard</h1>
     <div className="dashboard">
       <div className="dashboard__wrapper">
         <div className="dashboard__cards">
           <SingleCard item={carObj} />
           <SingleCard item={tripObj} />
           <SingleCard item={clientObj} />
           <SingleCard item={distanceObj} />
         </div>
 
         <div className="statics">
           <div className="stats">
             <h3 className="stats__title">Income Statistics</h3>
             <MileChart />
           </div>
 
           <div className="stats">
             <h3 className="stats__title">Revenue Statistics</h3>
             <CarStatsChart />
           </div>
         </div>
 
         
       </div>
     </div>
     </>
   );
 };
 
 export default Dashboard;