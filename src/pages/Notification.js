import React,{useState,useEffect} from 'react';
import "./NewPatient.css";
import axios from "axios"; 

const Notification = () => {
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Notifier/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);

  
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Medicine to be Restocked</h1>
     
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Category</th>
            <th style={{textAlign:"center"}}>Brand</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Price per item</th>
            <th style={{textAlign:"center"}}>Stock Available</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return (
              <tr key={item.medicine_id}>
                <th scope="row">{index+1}</th>
                <td>{item.medicine_ctg}</td>
                <td>{item.medicine_brand}</td>
                <td>{item.medicine_name}</td>
                <td>Rs.{item.medicine_price}</td>
                <td>{item.medicine_stock}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default Notification;
