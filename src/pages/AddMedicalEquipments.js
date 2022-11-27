import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    equp_name: "",
    equp_type: "",
    equp_date: "",
    equp_price: "",
};

const AddMedicalEquipments = () => {
    const [state,setState]=useState(initialState);

    const {equp_name,equp_type,equp_date,equp_price}=state;

    const history = useNavigate

    const{equp_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Equipments/get/${equp_id}`).then((resp)=> setState({...resp.data[0]}))
    },[equp_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!equp_name || !equp_type || !equp_date || !equp_price){
          toast.error("Please provide value into each input field");
        } else{
          if(!equp_id){
            axios.post("http://localhost:5000/Equipments/post",{
                equp_name,equp_type,equp_date,equp_price
            })
            .then(()=>{
              setState({equp_name: "",
              equp_type: "",
              equp_date: "",
              equp_price: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Equipment details added successfully");
          } else{
            axios.put(`http://localhost:5000/Equipments/update/${equp_id}`,{
                equp_name,equp_type,equp_date,equp_price
            })
            .then(()=>{
              setState({equp_name: "",
              equp_type: "",
              equp_date: "",
              equp_price: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Equipment updated successfully");
          }
            setTimeout(()=> history.push("/MedicalEquipments"),300);
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
        <center><h2>Add Equipment Details</h2></center>

        <label htmlFor="equp_name">Equipment Name</label>
      <input 
      type="text" 
      id="equp_name"
      name="equp_name"
      placeholder="Enter Equipment Name"
      value={equp_name || ""}
      onChange={handleInputChange}/>

        <label htmlFor="equp_type">Equipment type</label>
      <select 
      id="equp_type"
      name="equp_type"
      placeholder="Select Equipment Type"
      value={equp_type || ""}
      onChange={handleInputChange}>
        <option value="Choose">Choose</option>
        <option value="Machine">Machine</option>
        <option value="Tools">Tools</option>
        <option value="Prosthetics">Prosthetics</option>
        <option value="Raw Material">Raw Material</option>
      </select>

<label htmlFor="equp_date">Date of Purchase</label>
      <input 
      type="date" 
      id="equp_date"
      name="equp_date"
      placeholder="Enter Purchase Date"
      value={equp_date || ""}
      onChange={handleInputChange}/>

<label htmlFor="equp_price">Price</label>
      <input 
      type="number" 
      id="equp_price"
      name="equp_price"
      placeholder="Enter Amount"
      value={equp_price || ""}
      onChange={handleInputChange}/>



      <input type="submit" value={equp_id? "Update":"Save"}/>
      <Link to="/main/MedicalEquipments">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddMedicalEquipments;
