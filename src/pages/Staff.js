import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Staff.css";
import {toast} from "react-toastify";
import axios from "axios"; 
const Staff = () => {
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/staff/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);

  const deleteStaff = (stf_id) => {
    if(window.confirm("Are you sure that you want to delete the Staff ?")){
      axios.delete(`http://localhost:5000/staff/remove/${stf_id}`);
      toast.success("Staff Deleted Successfully");
      setTimeout(()=>loadData(),500);
    }
  }
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Staff Details</h1>
      <Link to="/main/AddStaff">
      <button className="btn btn-contact">Add Staff</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Designation</th>
            <th style={{textAlign:"center"}}>Date of Join</th>
            <th style={{textAlign:"center"}}>Contact Number</th>
            <th style={{textAlign:"center"}}>Email ID</th>
            <th style={{textAlign:"center"}}>Salary type</th>
            <th style={{textAlign:"center"}}>Salary Per Month</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => {
            return (
              <tr key={item.stf_id}>
                <th scope="row">{index+1}</th>
                <td>{item.stf_name}</td>
                <td>{item.stf_position}</td>
                <td>{item.stf_doj}</td>
                <td>{item.stf_phn}</td>            
                <td>{item.stf_mail}</td>
                <td>{item.stf_saltype}</td>
                <td>{item.stf_salmonth}</td>
                <td>
                  <Link to={`/main/stf_update/${item.stf_id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                   <button className="btn btn-delete" onClick={()=>deleteStaff(item.stf_id)}>Delete</button>
                   
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>     
    </div>
  )
}

export default Staff;
