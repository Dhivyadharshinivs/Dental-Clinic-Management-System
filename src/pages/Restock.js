import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const Restock = () => {
  const [search, setSearch] = useState('');
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Restock/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);
  console.log(data)

  const deleteRestock = (restck_id) => {
    if(window.confirm("Are you sure that you want to delete the restock details  ?")){
      axios.delete(`http://localhost:5000/Restock/remove/${restck_id}`);
      toast.success("Restock Details Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Medicine Restock Details</h1>
      <Link to="/main/AddRestock">
      <button className="btn btn-contact">Add Restock Details</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Medicine Restock'
            />
          </InputGroup>
        </Form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Medicine ID</th>
            <th style={{textAlign:"center"}}>Medicine Name</th>
            <th style={{textAlign:"center"}}>Quantity</th>
            <th style={{textAlign:"center"}}>Date</th>
            <th style={{textAlign:"center"}}>Price</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.restck_number.toLowerCase().includes(search);
          })
          .map((item,index) => {
            return (
              <tr key={item.restck_id}>
                <th scope="row">{index+1}</th>
                <td>{item.restck_number}</td>
                <td>{item.restck_medicine}</td>
                <td>{item.restck_quantity}</td>
                <td>{item.restck_date}</td>
                <td>Rs.{item.restck_price}</td>
                <td>
                  <Link to={`/main/updateRestock/${item.restck_id}`}>
                    <button className="btn btn-edit">Update</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>deleteRestock(item.restck_id)}>Delete</button> 
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default Restock;
