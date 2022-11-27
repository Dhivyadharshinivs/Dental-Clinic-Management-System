import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios';
import {toast} from "react-toastify";
import { useEffect } from 'react';
import { useState } from 'react';
import './View.css'

const EquipSales = () => {
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");
  const [data,setData] = useState([]);

  const handleSubmit = (e) =>{
   e.preventDefault();
   const date = new Date();
   const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+String(date.getDate());
   console.log(today);
   if(from>today)
       toast.error("From Date Should not be greater than today");
   else if(from>to)
       toast.error("From date should not be greater than to date");
   else{
           axios.get(`http://localhost:5000/equipsales/EquipSales/${from}/${to}`).then((response)=>{
               console.log(response.data)
               setData(response.data)
           }).catch((err)=>{
               toast.error(err.body.data)
           })
   }
}

useEffect(()=>{
setData(data)},
[data,setData]
)

const colums = [
  {field:"service_id", headerName:"Id",width:50},
  {field:"service_equp", headerName:"Equipment Name",width:250},
  {field:"service_date", headerName:"Service Date",width:150},
  {field:"service_amt", headerName:"Service Charge",width:150}
]
return (
  <div className='report'>
      <form className="form" onSubmit={handleSubmit}>
        <pre>
          <div className="formInput">
              <label htmlFor="from">From:</label>
                  <input type="date" name="from" id="from" value={from||""} onChange={(e)=>{setFrom(e.target.value)}}/>    <label htmlFor="to">To:</label>
                  <input type="date" name="to" id="to" value={to||""} onChange={(e)=>{setTo(e.target.value)}} /><button type="submit" className="btn2">Submit</button>
          </div>
          </pre>
      </form>

      <div className="dataTable">
   <h1>Equipment Service Report</h1>
    <DataGrid 
  rows={data}
  columns={colums}
  getRowId = {(row)=>row.service_id}
  components={{Toolbar:GridToolbar}}
/>
</div> 
  
  </div>

);
};

export default EquipSales;
