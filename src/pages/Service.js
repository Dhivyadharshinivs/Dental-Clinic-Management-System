import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const Service = () => {
  const [search, setSearch] = useState('');
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Service/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);
  console.log(data)
  const deleteService = (service_id) => {
    if(window.confirm("Are you sure that you want to delete the service details  ?")){
      axios.delete(`http://localhost:5000/Service/remove/${service_id}`);
      toast.success("Service Details Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Equipments Service Details</h1>
      <Link to="/main/AddService">
      <button className="btn btn-contact">Add Service Details</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Equipment Name'
            />
          </InputGroup>
        </Form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Equipment Name</th>
            <th style={{textAlign:"center"}}>Service Date</th>
            <th style={{textAlign:"center"}}>Service Amount</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.service_equp.toLowerCase().includes(search);
          })
          .map((item,index) => {
            return (
              <tr key={item.service_id}>
                <th scope="row">{index+1}</th>
                <td>{item.service_equp}</td>
                <td>{item.service_date}</td>
                <td>Rs.{item.service_amt}</td>
                <td>
                  <Link to={`/main/updateService/${item.service_id}`}>
                    <button className="btn btn-edit">Update</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>deleteService(item.service_id)}>Delete</button> 
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default Service;
