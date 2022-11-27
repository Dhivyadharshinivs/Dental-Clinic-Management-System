import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";

import axios from "axios"; 

const SendMsg = () => {
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Mail/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);

  
  
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Notification Mails To Send</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Patient ID</th>
            <th style={{textAlign:"center"}}>Patient Name</th>
            <th style={{textAlign:"center"}}>Patient Mail</th>
            <th style={{textAlign:"center"}}>Next Visit Date</th>
            <th style={{textAlign:"center"}}>Pending Amount</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return (
              <tr key={item.patient_id}>
                <th scope="row">{index+1}</th>
                <td>{item.patient_number}</td>
                <td>{item.patient_name}</td>
                <td>{item.patient_mail}</td>
                <td>{item.patient_nvd}</td>
                <td>Rs.{item.patient_pendingamt}</td>
               
                <td>
                  <Link to={`/main/updateMsg`}>
                    <button className="btn btn-edit">Send Mail</button>
                  </Link>
                 
                  
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default SendMsg;
