import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const Stock = () => {
  const [search, setSearch] = useState('');
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Stock/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);
  console.log(data)
  const deleteStock = (medicine_id) => {
    if(window.confirm("Are you sure that you want to delete the medicine  ?")){
      axios.delete(`http://localhost:5000/Stock/remove/${medicine_id}`);
      toast.success("Medicine Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Medicine Stock Details</h1>
      <Link to="/main/AddStock">
      <button className="btn btn-contact">Add Medicine</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Medicine with ID'
            />
          </InputGroup>
        </Form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Medicine ID</th>
            <th style={{textAlign:"center"}}>Category</th>
            <th style={{textAlign:"center"}}>Brand</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Price per item</th>
            <th style={{textAlign:"center"}}>Stock Available</th>
            <th style={{textAlign:"center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data
          .filter((item) => {
            return search.toLowerCase() === ''
              ? item
              : item.medicine_number.toLowerCase().includes(search);
          })
          .map((item,index) => {
            return (
              <tr key={item.medicine_id}>
                <th scope="row">{index+1}</th>
                <td>{item.medicine_number}</td>
                <td>{item.medicine_ctg}</td>
                <td>{item.medicine_brand}</td>
                <td>{item.medicine_name}</td>
                <td>Rs.{item.medicine_price}</td>
                <td>{item.medicine_stock}</td>
                <td>
                  <Link to={`/main/updateStock/${item.medicine_id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                   <button className="btn btn-delete" onClick={()=>deleteStock(item.medicine_id)}>Delete</button>
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default Stock;
