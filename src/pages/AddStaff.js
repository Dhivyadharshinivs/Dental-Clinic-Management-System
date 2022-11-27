import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    stf_name: "",
    stf_position: "",
    stf_doj: "",
    stf_phn: "",
    stf_mail: "",
    stf_address: "",
    stf_saltype: "",
    stf_salmonth: "",
};

const AddStaff = () => {
    const [state,setState]=useState(initialState);

    const {stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype, stf_salmonth}=state;

    const history = useNavigate

    const{stf_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/staff/get/${stf_id}`).then((resp)=> setState({...resp.data[0]}))
    },[stf_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!stf_name || !stf_position || !stf_doj || !stf_phn || !stf_mail || !stf_address ){
          toast.error("Please provide value into required input field");
        } else{
          if(!stf_id){
            axios.post("http://localhost:5000/staff/post",{
                stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address, stf_saltype, stf_salmonth
            })
            .then(()=>{
              setState({stf_name: "", stf_position: "", stf_doj: "",stf_phn: "", stf_mail: "", stf_address: "",stf_saltype: "",stf_salmonth: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Staff added successfully");
          } else{
            axios.put(`http://localhost:5000/staff/update/${stf_id}`,{
                stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address, stf_saltype, stf_salmonth
            })
            .then(()=>{
              setState({stf_name: "", stf_position: "", stf_doj: "",stf_phn: "", stf_mail: "", stf_address: "",stf_saltype: "",stf_salmonth: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Staff updated successfully");
          }
            setTimeout(()=> history.push("/"),500);
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
        <center><h2>Add Staff Details</h2></center>
      <label htmlFor="stf_name">Name</label>
      <input 
      type="text" 
      id="stf_name"
      name="stf_name"
      placeholder="Enter Staff Name"
      value={stf_name || ""}
      onChange={handleInputChange}/>

<label htmlFor="stf_position">Designation</label>
      <input 
      type="text" 
      id="stf_position"
      name="stf_position"
      placeholder="Enter Staff Designation"
      value={stf_position || ""}
      onChange={handleInputChange}/>

<label htmlFor="stf_doj">Date of Join</label>
      <input 
      type="date" 
      id="stf_doj"
      name="stf_doj"
      placeholder="Enter Date of Join"
      value={stf_doj || ""}
      onChange={handleInputChange}/>

<label htmlFor="stf_phn">Contact</label>
      <input 
      type="number" 
      id="stf_phn"
      name="stf_phn"
      placeholder="Enter Contact Number"
      value={stf_phn || ""}
      onChange={handleInputChange}/>

      <label htmlFor="stf_mail">Email</label>
      <input 
      type="email" 
      id="stf_mail"
      name="stf_mail"
      placeholder="Enter Staff Email Id"
      value={stf_mail || ""}
      onChange={handleInputChange}/>

<label htmlFor="stf_address">Address</label>
      <input 
      type="text" 
      id="stf_address"
      name="stf_address"
      placeholder="Enter Staff address"
      value={stf_address || ""}
      onChange={handleInputChange}/>

<label htmlFor="stf_saltype">Salary Type</label>
      <select 
      id="stf_saltype"
      name="stf_saltype"
      placeholder="Select Staff Salary Type"
      value={stf_saltype || ""}
      onChange={handleInputChange}>
        <option value="Choose">Choose</option>
        <option value="Monthly salary">Monthly salary</option>
        <option value="Per Visit">Per Visit</option>
      </select>

<label htmlFor="stf_salmonth">Salary</label>
      <input 
      type="number" 
      id="stf_salmonth"
      name="stf_salmonth"
      placeholder="Enter Salary Per Month"
      value={stf_salmonth || ""}
      onChange={handleInputChange}/>
      
      

      <input type="submit" value={stf_id? "Update":"Save"}/>
      <Link to="/main/Staff">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddStaff;
