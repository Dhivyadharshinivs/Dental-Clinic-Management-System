import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import "./NewPatient.css";
import {toast} from "react-toastify";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios"; 

const MedicalEquipments = () => {
  const [search, setSearch] = useState('');
  const [data,setData]=useState([]);
  const loadData=async ()=>{
      const response = await axios.get("http://localhost:5000/Equipments/get");
      setData(response.data);
  };
  useEffect(()=>{
   loadData();
  },[]);
  console.log(data)
  const deleteEquipments = (equp_id) => {
    if(window.confirm("Are you sure that you want to delete the Equipment detail  ?")){
      axios.delete(`http://localhost:5000/Equipments/remove/${equp_id}`);
      toast.success("Equipment details Deleted Successfully");
      setTimeout(()=>loadData(),300);
    }
  }
  return (
    <div style={{marginTop: "10px"}}>
      <h1>Dental Equipment Details</h1>
      <Link to="/main/AddMedicalEquipments">
      <button className="btn btn-contact">Add Equipment</button>
      </Link>
      <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Enter Category'
            />
          </InputGroup>
        </Form>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign:"center"}}>No.</th>
            <th style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Category</th>
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
              : item.equp_type.toLowerCase().includes(search);
          })
          .map((item,index) => {
            return (
              <tr key={item.equp_id}>
                <th scope="row">{index+1}</th>
                <td>{item.equp_name}</td>
                <td>{item.equp_type}</td>
                <td>{item.equp_date}</td>
                <td>Rs.{item.equp_price}</td>
                <td>
                  <Link to={`/main/updateEquipments/${item.equp_id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                   <button className="btn btn-delete" onClick={()=>deleteEquipments(item.equp_id)}>Delete</button>
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      
    </div>
  )
}

export default MedicalEquipments;
