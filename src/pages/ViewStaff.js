import React,{useState,useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./ViewStaff.css";

const ViewStaff = () => {
    const [user,setUser]=useState({});

    const {stf_id}=useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/staff/get/${stf_id}`).then((resp)=> setUser({...resp.data[0]}))
      },[stf_id]);
  return (
    <div style={{marginTop: "50px"}}>
         <div className="card">
             <div className="card-header"><p>Staff Details</p></div>
             <div className="container">
                <strong>ID: </strong>
                <span>{stf_id}</span>
                <br />
                <br />
                <strong>Name: </strong>
                <span>{user.stf_name}</span>
                <br />
                <br />
                <strong>Designation: </strong>
                <span>{user.stf_position}</span>
                <br />
                <br />
                <strong>Date of Join: </strong>
                <span>{user.stf_doj}</span>
                <br />
                <br />
                <strong>Contact Number: </strong>
                <span>{user.stf_phn}</span>
                <br />
                <br />
                <strong>Email Id: </strong>
                <span>{user.stf_mail}</span>
                <br />
                <br />
                <strong>Address: </strong>
                <span>{user.stf_address}</span>
                <br />
                <br />
                <strong>Salary/month: </strong>
                <span>{user.stf_salmonth}</span>
                <br />
                <br />
                <Link to="/Staff">
                 <div className="btn btn-edit">Go Back</div>
                </Link>

             </div>

         </div>
    </div>
  )
}

export default ViewStaff;
