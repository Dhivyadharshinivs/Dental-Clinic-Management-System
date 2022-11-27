import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
   patient_number: "",
   patient_name: "",
   patient_address: "",
   patient_phn: "",
   patient_mail: "",
   patient_age: "",
   patient_gender: "",
   patient_prblm: "",
   patient_treatment: "",
   patient_dov: "",
   patient_nvd: "",
   patient_pendingamt: "",
};

const NewPatient = () => {
    const [state,setState]=useState(initialState);

    const {patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt}=state;

    const history = useNavigate

    const{patient_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Patient/get/${patient_id}`).then((resp)=> setState({...resp.data[0]}))
    },[patient_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!patient_number || !patient_name || !patient_address || !patient_phn || !patient_mail || !patient_age || !patient_gender || !patient_dov ){
          toast.error("Please provide value into each input field");
        } else{
          if(!patient_id){
            axios.post("http://localhost:5000/Patient/post",{
                patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt
            })
            .then(()=>{
              setState({patient_number: "",
              patient_name: "",
              patient_address: "",
              patient_phn: "",
              patient_mail: "",
              patient_age: "",
              patient_gender: "",
              patient_prblm: "",
              patient_treatment: "",
              patient_dov: "",
              patient_nvd: "",
              patient_pendingamt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Patient Details added successfully");
          } else{
            axios.put(`http://localhost:5000/Patient/update/${patient_id}`,{
                patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt
            })
            .then(()=>{
              setState({patient_number: "",
              patient_name: "",
              patient_address: "",
              patient_phn: "",
              patient_mail: "",
              patient_age: "",
              patient_gender: "",
              patient_prblm: "",
              patient_treatment: "",
              patient_dov: "",
              patient_nvd: "",
              patient_pendingamt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Patient Details updated successfully");
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
        <center><h2>Add Patient Details</h2></center>

        <label htmlFor="patient_number">Patient ID</label>
      <input 
      type="text" 
      id="patient_number"
      name="patient_number"
      placeholder="Enter Patient ID"
      value={patient_number  || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_name">Name</label>
      <input 
      type="text" 
      id="patient_name"
      name="patient_name"
      placeholder="Enter Patient Name"
      value={patient_name || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_address">Patient Address</label>
      <input 
      type="text" 
      id="patient_address"
      name="patient_address"
      placeholder="Enter Patient Address"
      value={patient_address || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_phn">Contact</label>
      <input 
      type="number" 
      id="patient_phn"
      name="patient_phn"
      placeholder="Enter Contact Number"
      value={patient_phn || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_mail">Email</label>
      <input 
      type="email" 
      id="patient_mail"
      name="patient_mail"
      placeholder="Enter Patient Email Id"
      value={patient_mail || ""}
      onChange={handleInputChange}/>

      
<label htmlFor="patient_age">Age</label>
      <input 
      type="number" 
      id="patient_age"
      name="patient_age"
      placeholder="Enter Patient Age"
      value={patient_age || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_gender">Gender</label>
      <select 
      id="patient_gender"
      name="patient_gender"
      placeholder="Select Patient Gender"
      value={patient_gender || ""}
      onChange={handleInputChange}>
        <option value="Choose">Choose</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Transgender">Transgender</option>
      </select>

      <label htmlFor="patient_prblm">Problem</label>
      <input 
      type="text" 
      id="patient_prblm"
      name="patient_prblm"
      placeholder="Enter Patient Problem"
      value={patient_prblm || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_treatment">Treatment</label>
      <input 
      type="text" 
      id="patient_treatment"
      name="patient_treatment"
      placeholder="Enter Treatment Given"
      value={patient_treatment || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_dov">Date of Visit</label>
      <input 
      type="date" 
      id="patient_dov"
      name="patient_dov"
      placeholder="Enter Date of Visit"
      value={patient_dov || ""}
      onChange={handleInputChange}/>

<label htmlFor="patient_nvd">Next Visit Date</label>
      <input 
      type="date" 
      id="patient_nvd"
      name="patient_nvd"
      placeholder="Enter Next Visit Date"
      value={patient_nvd || ""}
      onChange={handleInputChange}/>


<label htmlFor="patient_pendingamt">Pending amount</label>
      <input 
      type="number" 
      id="patient_pendingamt"
      name="patient_pendingamt"
      placeholder="Enter Pending Amount if any..."
      value={patient_pendingamt|| ""}
      onChange={handleInputChange}/>
      
      <input type="submit" value={patient_id? "Update":"Save"}/>
      <Link to="/main/ViewPatient">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default NewPatient;
