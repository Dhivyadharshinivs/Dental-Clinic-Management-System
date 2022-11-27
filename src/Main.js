import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from "react-router-dom"
import Staff from "./pages/Staff";
import AddStaff from "./pages/AddStaff";
import SideBar from "./components/Sidebar/SideBar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NewPatient from "./pages/NewPatient";
import Stock from "./pages/Stock";
import AddStock from "./pages/AddStock";
import Restock from "./pages/Restock";
import Sales from "./pages/Sales";
import AddSales from "./pages/AddSales";
import MedicalEquipments from "./pages/MedicalEquipments";
import AddMedicalEquipments from "./pages/AddMedicalEquipments";
import Dashboard from "./pages/Dashboard";
import AddRestock from "./pages/AddRestock";
import Service from "./pages/Service";
import AddService from "./pages/AddService";
import SendMsg from "./pages/SendMsg";
import Mail from "./pages/Mail";
import ViewPatient from "./pages/ViewPatient";
import PntReport from "./pages/PntReport";
import Equip from "./pages/Equip";
import EquipSales from "./pages/EquipSales";
import Med from "./pages/Med";
import MedSales from "./pages/MedSales";
import PntSurgeryR from "./pages/PntSurgeryR";
import GrpSurgeryR from "./pages/GrpSurgeryR";
import Notification from "./pages/Notification";

const Main = () => {
  return (
    <div>
      <Header />
      <SideBar>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element=<Dashboard/> />
        <Route path ="/NewPatient" element=<NewPatient/> />
        <Route path ="/ViewPatient" element=<ViewPatient/> />
        <Route path="/updatePatient/:patient_id" element=<NewPatient/> />
        <Route path ="/Staff" element=<Staff/> />
        <Route path ="/AddStaff" element=<AddStaff/> />
        <Route path="/stf_update/:stf_id" element=<AddStaff/> />
        <Route path ="/Stock" element=<Stock/> />
        <Route path ="/AddStock" element=<AddStock/> />
        <Route path ="/updateStock/:medicine_id" element=<AddStock/> />
        <Route path ="/Restock" element=<Restock/> />
        <Route path ="/AddRestock" element=<AddRestock/> />
        <Route path ="/updateRestock/:restck_id" element=<AddRestock/> />
        <Route path ="/Sales" element=<Sales/> />
        <Route path ="/AddSales" element=<AddSales/> />
        <Route path ="/updateSales/:sales_id" element=<AddSales/> />
        <Route path ="/Notification" element=<Notification/> />
        <Route path ="/MedicalEquipments" element=<MedicalEquipments/> />
        <Route path ="/AddMedicalEquipments" element=<AddMedicalEquipments/> />
        <Route path ="/updateEquipments/:equp_id" element=<AddMedicalEquipments/> />
        <Route path ="/Service" element=<Service/> />
        <Route path ="/AddService" element=<AddService/> />
        <Route path ="/updateService/:service_id" element=<AddService/> />
        <Route path ="/SendMsg" element=<SendMsg/> />
        <Route path ="/updateMsg" element=<Mail/> />
        <Route path="/PntReport" element=<PntReport/> />
        <Route path="/Equip" element=<Equip/> />
        <Route path="/EquipSales" element=<EquipSales/> />
        <Route path="/Med" element=<Med/> />
        <Route path="/MedSales" element=<MedSales/> />
        <Route path="/PntSurgeryR" element=<PntSurgeryR/> />
        <Route path="/GrpSurgeryR" element=<GrpSurgeryR/> />
      </Routes>
      </SideBar>
      <Footer />
    </div>
  )
}

export default Main
