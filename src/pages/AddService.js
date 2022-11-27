import React,{useState,useEffect} from 'react';
import {useNavigate,useParams,Link} from "react-router-dom";
import "./AddStaff.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    service_equp: "",
    service_date: "",
    service_amt: "",
};

const AddService = () => {
    const [state,setState]=useState(initialState);

    const {service_equp,service_date,service_amt}=state;

    const history = useNavigate

    const{service_id}=useParams();

    useEffect(()=>{
      axios.get(`http://localhost:5000/Service/get/${service_id}`).then((resp)=> setState({...resp.data[0]}))
    },[service_id]);

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!service_equp || !service_date || !service_amt){
          toast.error("Please provide value into each input field");
        } else{
          if(!service_id){
            axios.post("http://localhost:5000/Service/post",{
                service_equp,service_date,service_amt
            })
            .then(()=>{
              setState({service_equp: "",
              service_date: "",service_amt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Service details added successfully");
          } else{
            axios.put(`http://localhost:5000/Service/update/${service_id}`,{
                service_equp,service_date,service_amt
            })
            .then(()=>{
              setState({service_equp: "",
              service_date: "",service_amt: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Service Detail updated successfully");
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
        <center><h2>Add Service Details</h2></center>
      <label htmlFor="service_equp">Equipment Name</label>
      <input 
      type="text" 
      id="service_equp"
      name="service_equp"
      placeholder="Enter Equipment Name"
      value={service_equp|| ""}
      onChange={handleInputChange}/>

<label htmlFor="service_date">Service Date</label>
      <input 
      type="date" 
      id="service_date"
      name="service_date"
      placeholder="Select Service Date"
      value={service_date|| ""}
      onChange={handleInputChange}/>

<label htmlFor="service_amt">Service Charge</label>
      <input 
      type="number" 
      id="service_amt"
      name="service_amt"
      placeholder="Enter Service Charge"
      value={service_amt|| ""}
      onChange={handleInputChange}/>

      <input type="submit" value={service_id? "Update":"Save"}/>
      <Link to="/main/Service">
        <input type="button" value="Go Back"/>
      </Link>
      </form>
    </div>
  )
};

export default AddService;
