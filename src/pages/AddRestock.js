import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    restck_number: "",
    restck_medicine: "",
    restck_quantity: "",
    restck_date: "",
    restck_price: "",
};

const AddRestock = () => {
    const [state,setState]=useState(initialState);

    const {restck_number,restck_medicine,restck_quantity,restck_date,restck_price}=state;

    const history = useNavigate

    const{restck_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Restock/get/${restck_id}`).then((resp)=> setState({...resp.data[0]}))
    },[restck_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!restck_number || !restck_medicine || !restck_quantity || !restck_date || !restck_price){
          toast.error("Please provide value into each input field");
        } else{
          if(!restck_id){
            axios.post("http://localhost:5000/Restock/post",{
              restck_number,restck_medicine,restck_quantity,restck_date,restck_price
            })
            .then(()=>{
              setState({restck_number: "",restck_medicine: "",
              restck_quantity: "",restck_date: "",restck_price: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Restock details added successfully");
          } else{
            axios.put(`http://localhost:5000/Restock/update/${restck_id}`,{
              restck_number,restck_medicine,restck_quantity,restck_date,restck_price
            })
            .then(()=>{
              setState({restck_number: "",restck_medicine: "",
              restck_quantity: "",restck_date: "",restck_price: "" });
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Restock Detail updated successfully");
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
        <center><h2>Add Restock Details</h2></center>
        <label htmlFor="restck_number">Medicine ID</label>
      <input 
      type="text" 
      id="restck_number"
      name="restck_number"
      placeholder="Enter Medicine ID"
      value={restck_number|| ""}
      onChange={handleInputChange}/>

      <label htmlFor="restck_medicine">Medicine Name</label>
      <input 
      type="text" 
      id="restck_medicine"
      name="restck_medicine"
      placeholder="Enter Medicine Name"
      value={restck_medicine|| ""}
      onChange={handleInputChange}/>

<label htmlFor="restck_quantity">Quantity</label>
      <input 
      type="number" 
      id="restck_quantity"
      name="restck_quantity"
      placeholder="Enter Restock Quantity"
      value={restck_quantity|| ""}
      onChange={handleInputChange}/>

<label htmlFor="restck_date">Date of Restock</label>
      <input 
      type="date" 
      id="restck_date"
      name="restck_date"
      placeholder="Enter Restock Date"
      value={restck_date|| ""}
      onChange={handleInputChange}/>

<label htmlFor="restck_price">Price</label>
      <input 
      type="number" 
      id="restck_price"
      name="restck_price"
      placeholder="Enter Restock Medicine Price"
      value={restck_price|| ""}
      onChange={handleInputChange}/>

      <input type="submit" value={restck_id? "Update":"Save"}/>
      <Link to="/main/Restock">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddRestock;
