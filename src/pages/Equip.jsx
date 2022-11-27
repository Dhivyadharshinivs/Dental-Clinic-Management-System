import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import axios from 'axios';
import {toast} from "react-toastify";
import { useEffect } from 'react';
import { useState } from 'react';
import './View.css'

const Equip = () => {
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
           axios.get(`http://localhost:5000/equip/Equip/${from}/${to}`).then((response)=>{
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
  {field:"equp_id", headerName:"Id",width:50},
  {field:"equp_name", headerName:"Name",width:150},
  {field:"equp_type", headerName:"Equipment Type",width:150},
  {field:"equp_date", headerName:"Purchase Date",width:150},
  {field:"equp_price", headerName:"Price",width:150}
]

return (
  <div className='report'>
      <form className="form" onSubmit={handleSubmit}>
        <pre>
          <div className="formInput">
              <label htmlFor="from">From:</label>
                  <input type="date" name="from" id="from" value={from||""} onChange={(e)=>{setFrom(e.target.value)}}/>    <label htmlFor="to">To:</label>
                  <input type="date" name="to" id="to" value={to||""} onChange={(e)=>{setTo(e.target.value)}} />  <button type="submit" className="btn2">Submit</button>
          </div>
          </pre>
      </form>

      <div className="dataTable">
   <h1>Equipment Purchase Report</h1>
    <DataGrid 
  rows={data}
  columns={colums}
  getRowId = {(row)=>row.equp_id}
  components={{Toolbar:GridToolbar}}
/>
</div> 
  
  </div>

);
};

export default Equip;
