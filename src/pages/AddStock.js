import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    medicine_number: "",
    medicine_ctg: "",
    medicine_brand: "",
    medicine_name: "",
    medicine_price: "",
    medicine_stock: "",
    medicine_reorder: ""
};

const AddStock = () => {
    const [state,setState]=useState(initialState);

    const {medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder}=state;

    const history = useNavigate

    const{medicine_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Stock/get/${medicine_id}`).then((resp)=> setState({...resp.data[0]}))
    },[medicine_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!medicine_number || !medicine_ctg || !medicine_brand || !medicine_name || !medicine_price || !medicine_stock || !medicine_reorder){
          toast.error("Please provide value into each input field");
        } else{
          if(!medicine_id){
            axios.post("http://localhost:5000/Stock/post",{
                medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder
            })
            .then(()=>{
              setState({medicine_number: "", medicine_ctg: "",
              medicine_brand: "",
              medicine_name: "",
              medicine_price: "",
              medicine_stock: "",
              medicine_reorder: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Medicine Stock added successfully");
          } else{
            axios.put(`http://localhost:5000/Stock/update/${medicine_id}`,{
               medicine_number, medicine_ctg, medicine_brand, medicine_name, medicine_price, medicine_stock,medicine_reorder
            })
            .then(()=>{
              setState({medicine_number: "", medicine_ctg: "",
              medicine_brand: "",
              medicine_name: "",
              medicine_price: "",
              medicine_stock: "",medicine_reorder: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Stock updated successfully");
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
        <center><h2>Add Medicine Stock Details</h2></center>

        <label htmlFor="medicine_number">Medicine ID</label>
      <input 
      type="text" 
      id="medicine_number"
      name="medicine_number"
      placeholder="Enter Medicine ID"
      value={medicine_number || ""}
      onChange={handleInputChange}/>

        <label htmlFor="medicine_ctg">Medicine Category</label>
      <select 
      id="medicine_ctg"
      name="medicine_ctg"
      placeholder="Select Medicine Category"
      value={medicine_ctg || ""}
      onChange={handleInputChange}>
        <option value="Choose">Choose</option>
        <option value="Pain Controller">Pain Controller</option>
        <option value="Gel/Paste">Gel/Paste</option>
        <option value="Antibiotic">Antibiotic</option>
        <option value="Anti-inflammatory Drug">Anti-inflammatory Drug</option>
        <option value="Topical Analgesics">Topical Analgesics</option>
      </select>

<label htmlFor="medicine_brand">Medicine Brand</label>
      <input 
      type="text" 
      id="medicine_brand"
      name="medicine_brand"
      placeholder="Enter Medicine Brand"
      value={medicine_brand || ""}
      onChange={handleInputChange}/>

<label htmlFor="medicine_name">Medicine Name</label>
      <input 
      type="text" 
      id="medicine_name"
      name="medicine_name"
      placeholder="Enter Medicine Name"
      value={medicine_name || ""}
      onChange={handleInputChange}/>

<label htmlFor="medicine_price">Price per item</label>
      <input 
      type="number" 
      id="medicine_price"
      name="medicine_price"
      placeholder="Enter Price per item"
      value={medicine_price|| ""}
      onChange={handleInputChange}/>

      <label htmlFor="medicine_stock">Available stock</label>
      <input 
      type="number" 
      id="medicine_stock"
      name="medicine_stock"
      placeholder="Enter Stock Availability"
      value={medicine_stock || ""}
      onChange={handleInputChange}/>

<label htmlFor="medicine_reorder">Reorder level</label>
      <input 
      type="number" 
      id="medicine_reorder"
      name="medicine_reorder"
      placeholder="Enter Reorder level"
      value={medicine_reorder || ""}
      onChange={handleInputChange}/>

      <input type="submit" value={medicine_id? "Update":"Save"}/>
      <Link to="/main/Stock">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddStock;
