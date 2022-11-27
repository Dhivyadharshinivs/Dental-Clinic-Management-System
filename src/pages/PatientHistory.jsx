import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const ViewPatient = () => {
  
  const [search, setSearch] = useState('');

  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Patient/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);

  console.log(data)

  const deletePatient = (patient_id) => {
    if(window.confirm("Are you sure that you want to delete the medicine  ?")){
      axios.delete(`http://localhost:5000/Patient/remove/${patient_id}`);
      toast.success("Patient Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Patient Details</h1>
      <Link to="/NewPatient">
      <button className="btn btn-contact">Add Patient</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Patient'
            />
          </InputGroup>
        </Form>
      <table className="styled-table">
        <thead>
          <tr>
          <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Patient Name</th>
            <th style={{textAlign:"center"}}>Age</th>
            <th style={{textAlign:"center"}}>Problem</th>
            <th style={{textAlign:"center"}}>Treatment</th>
            <th style={{textAlign:"center"}}>Date Visited</th>
            <th style={{textAlign:"center"}}>Next Visit Date</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
            {data
              .filter((item) => {
                return search.toLowerCase() === ''
                  ? item
                  : item.patient_name.toLowerCase().includes(search);
              })
              .map((item, index) => (
                <tr key={item.patient_id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.patient_name}</td>
                  <td>{item.patient_age}</td>
                  <td>{item.patient_prblm}</td>
                  <td>{item.patient_treatment}</td>
                  <td>{item.patient_dov}</td>
                  <td>{item.patient_nvd}</td>
                  <td>
                  <Link to={`/updatePatient/${item.patient_id}`}>
                    <button className="btn btn-edit">Update</button>
                  </Link>
                   <button className="btn btn-delete" onClick={()=>deletePatient(item.patient_id)}>Delete</button>
                   <Link to={`/viewPatient/${item.patient_id}`}>
                    <button className="btn btn-view">History</button>
                  </Link>
                </td>
                </tr>
              ))}
          </tbody>
      </table>

      
    </div>
  )
}

export default ViewPatient;
