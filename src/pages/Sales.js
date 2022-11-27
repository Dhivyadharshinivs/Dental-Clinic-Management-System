import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const Sales = () => {
  const [search, setSearch] = useState('');
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Sales/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);
  console.log(data)
  const deleteSales = (sales_id) => {
    if(window.confirm("Are you sure that you want to delete the sales details  ?")){
      axios.delete(`http://localhost:5000/Sales/remove/${sales_id}`);
      toast.success("Sales Details Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Medicine Sales Details</h1>
      <Link to="/main/AddSales">
      <button className="btn btn-contact">Add Sales Details</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>

            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Medicine Sales'
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
              : item.sales_number.toLowerCase().includes(search);
          })
          .map((item,index) => {
            return (
              <tr key={item.sales_id}>
                <th scope="row">{index+1}</th>
                <td>{item.sales_number}</td>
                <td>{item.sales_medicine}</td>
                <td>{item.sales_quantity}</td>
                <td>{item.sales_date}</td>
                <td>Rs.{item.sales_amt}</td>
                <td>
                  <Link to={`/main/updateSales/${item.sales_id}`}>
                    <button className="btn btn-edit">Update</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>deleteSales(item.sales_id)}>Delete</button>                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>    
    </div>
  )
}
export default Sales;
