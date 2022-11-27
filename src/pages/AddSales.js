import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
  sales_number: "",
  sales_medicine: "",
  sales_quantity: "",
  sales_date: "",
  sales_amt: "",
};

const AddSales = () => {
    const [state,setState]=useState(initialState);

    const {sales_number,sales_medicine, sales_quantity, sales_date,sales_amt}=state;

    const history = useNavigate

    const{sales_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Sales/get/${sales_id}`).then((resp)=> setState({...resp.data[0]}))
    },[sales_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!sales_number || !sales_medicine || !sales_quantity || !sales_date || !sales_amt){
          toast.error("Please provide value into each input field");
        } else{
          if(!sales_id){
            axios.post("http://localhost:5000/Sales/post",{
                sales_number,sales_medicine, sales_quantity,sales_date,sales_amt
            })
            .then(()=>{
              setState({sales_number: "",sales_medicine: "",sales_quantity: "",sales_date: "",
              sales_amt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Sales details added successfully");
          } else{
            axios.put(`http://localhost:5000/Sales/update/${sales_id}`,{
              sales_number,sales_medicine,sales_quantity,sales_date,sales_amt
            })
            .then(()=>{
              setState({sales_number: "",sales_medicine: "",sales_quantity: "",sales_date: "",
              sales_amt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Sales Detail updated successfully");
          }
            setTimeout(()=> history.push("/"),300);
          }
        }
  

    const handleInputChange=(e)=>{
        const {name, value} = e.target;
        setState({...state,[name]:value});
    };

  return (
    <div style={{marginTop:"10px"}}>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent:"center"
      }}
      onSubmit={handleSubmit}
      >
        <center><h2>Add Sales Details</h2></center>

        <label htmlFor="sales_number">Medicine ID</label>
      <input 
      type="text" 
      id="sales_number"
      name="sales_number"
      placeholder="Enter Medicine ID"
      value={sales_number|| ""}
      onChange={handleInputChange}/>

        <label htmlFor="sales_medicine">Medicine name</label>
      <input 
      type="text" 
      id="sales_medicine"
      name="sales_medicine"
      placeholder="Enter Medicine Nane"
      value={sales_medicine|| ""}
      onChange={handleInputChange}/>

<label htmlFor="sales_quantity">Quantity</label>
      <input 
      type="number" 
      id="sales_quantity"
      name="sales_quantity"
      placeholder="Enter Quantity"
      value={sales_quantity|| ""}
      onChange={handleInputChange}/>


      <label htmlFor="sales_date">Date</label>
      <input 
      type="date" 
      id="sales_date"
      name="sales_date"
      placeholder="Select Sales Date"
      value={sales_date|| ""}
      onChange={handleInputChange}/>

<label htmlFor="sales_amt">Price</label>
      <input 
      type="number" 
      id="sales_amt"
      name="sales_amt"
      placeholder="Enter Sales Income"
      value={sales_amt|| ""}
      onChange={handleInputChange}/>


      <input type="submit" value={sales_id? "Update":"Save"}/>
      <Link to="/main/Sales">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddSales;
