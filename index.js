const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Vishadhi@14",
    database: "dentalclinic"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



/*Staff*/

app.get("/staff/get",(req,res)=> {
    const sqlGet = "SELECT * FROM staff_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/staff/post",(req,res) => {
    const{stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype, stf_salmonth} = req.body;
    const sqlInsert = "INSERT INTO staff_db(stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype,stf_salmonth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype, stf_salmonth], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/staff/remove/:stf_id",(req,res) => {
    const{ stf_id } = req.params;
    const sqlRemove = "DELETE FROM staff_db WHERE stf_id = ?";
    db.query(sqlRemove, stf_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/staff/get/:stf_id",(req,res)=> {
    const {stf_id} = req.params;
    const sqlGet = "SELECT * FROM staff_db WHERE stf_id=?";
    db.query(sqlGet, stf_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/staff/update/:stf_id",(req,res)=> {
    const {stf_id} = req.params;
    const {stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype,stf_salmonth} = req.body;
    const sqlUpdate= "UPDATE staff_db SET stf_name = ?, stf_position = ?, stf_doj = ?, stf_phn = ?, stf_mail = ?, stf_address = ?,stf_saltype=?, stf_salmonth = ? WHERE stf_id=?";
    db.query(sqlUpdate,[ stf_name, stf_position, stf_doj, stf_phn, stf_mail, stf_address,stf_saltype,stf_salmonth,stf_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Notifier */

app.get("/Notifier/get",(req,res)=> {
    const sqlGet = "SELECT * FROM medicinestock_db WHERE medicine_stock <= medicine_reorder";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});


/* Medicine Stock */

app.get("/Stock/get",(req,res)=> {
    const sqlGet = "SELECT * FROM medicinestock_db ORDER BY medicine_stock ASC";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Stock/post",(req,res) => {
    const{medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder} = req.body;
    const sqlInsert = "INSERT INTO medicinestock_db(medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Stock/remove/:medicine_id",(req,res) => {
    const{ medicine_id } = req.params;
    const sqlRemove = "DELETE FROM medicinestock_db WHERE medicine_id = ?";
    db.query(sqlRemove, medicine_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Stock/get/:medicine_id",(req,res)=> {
    const {medicine_id} = req.params;
    const sqlGet = "SELECT * FROM medicinestock_db WHERE medicine_id=?";
    db.query(sqlGet, medicine_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Stock/update/:medicine_id",(req,res)=> {
    const {medicine_id} = req.params;
    const {medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder} = req.body;
    const sqlUpdate= "UPDATE medicinestock_db SET medicine_number=?,medicine_ctg=?, medicine_brand=?, medicine_name=?,medicine_price=?,medicine_stock=?, medicine_reorder=? WHERE medicine_id=?";
    db.query(sqlUpdate,[medicine_number,medicine_ctg, medicine_brand, medicine_name,medicine_price,medicine_stock,medicine_reorder,medicine_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Sales */

app.get("/Sales/get",(req,res)=> {
    const sqlGet = "SELECT * FROM sales_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Sales/post",(req,res) => {
    const{sales_number,sales_medicine,sales_quantity,sales_date,sales_amt} = req.body;
    const sqlInsert = "INSERT INTO sales_db(sales_number,sales_medicine,sales_quantity,sales_date,sales_amt) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [sales_number,sales_medicine,sales_quantity,sales_date,sales_amt], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Sales/remove/:sales_id",(req,res) => {
    const{ sales_id } = req.params;
    const sqlRemove = "DELETE FROM sales_db WHERE sales_id = ?";
    db.query(sqlRemove, sales_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Sales/get/:sales_id",(req,res)=> {
    const {sales_id} = req.params;
    const sqlGet = "SELECT * FROM sales_db WHERE sales_id=?";
    db.query(sqlGet, sales_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Sales/update/:sales_id",(req,res)=> {
    const {sales_id} = req.params;
    const {sales_number,sales_medicine,sales_quantity,sales_date,sales_amt} = req.body;
    const sqlUpdate= "UPDATE sales_db SET sales_number=?,sales_medicine=?,sales_quantity=?,sales_date=?,sales_amt=? WHERE sales_id=?";
    db.query(sqlUpdate,[sales_number,sales_medicine,sales_quantity,sales_date,sales_amt,sales_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Restock */

app.get("/Restock/get",(req,res)=> {
    const sqlGet = "SELECT * FROM medicinerestk_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Restock/post",(req,res) => {
    const{restck_number,restck_medicine,restck_quantity,restck_date,restck_price} = req.body;
    const sqlInsert = "INSERT INTO medicinerestk_db(restck_number,restck_medicine,restck_quantity,restck_date,restck_price) VALUES (?, ?, ?, ?, ?)";
    db.query(sqlInsert, [restck_number,restck_medicine,restck_quantity,restck_date,restck_price], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Restock/remove/:restck_id",(req,res) => {
    const{ restck_id } = req.params;
    const sqlRemove = "DELETE FROM medicinerestk_db WHERE restck_id = ?";
    db.query(sqlRemove, restck_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Restock/get/:restck_id",(req,res)=> {
    const {restck_id} = req.params;
    const sqlGet = "SELECT * FROM medicinerestk_db WHERE restck_id=?";
    db.query(sqlGet, restck_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Restock/update/:restck_id",(req,res)=> {
    const {restck_id} = req.params;
    const {restck_number,restck_medicine,restck_quantity,restck_date,restck_price} = req.body;
    const sqlUpdate= "UPDATE medicinerestk_db SET restck_number=?,restck_medicine=?, restck_quantity=?, restck_date=?,restck_price=? WHERE restck_id=?";
    db.query(sqlUpdate,[restck_number,restck_medicine, restck_quantity,restck_date,restck_price,restck_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Equipments */

app.get("/Equipments/get",(req,res)=> {
    const sqlGet = "SELECT * FROM equip_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Equipments/post",(req,res) => {
    const{equp_name,equp_type,equp_date,equp_price} = req.body;
    const sqlInsert = "INSERT INTO equip_db(equp_name,equp_type,equp_date,equp_price) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [equp_name,equp_type,equp_date,equp_price], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Equipments/remove/:equp_id",(req,res) => {
    const{ equp_id } = req.params;
    const sqlRemove = "DELETE FROM equip_db WHERE equp_id = ?";
    db.query(sqlRemove, equp_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Equipments/get/:equp_id",(req,res)=> {
    const {equp_id} = req.params;
    const sqlGet = "SELECT * FROM equip_db WHERE equp_id=?";
    db.query(sqlGet, equp_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Equipments/update/:equp_id",(req,res)=> {
    const {equp_id} = req.params;
    const {equp_name,equp_type,equp_date,equp_price} = req.body;
    const sqlUpdate= "UPDATE equip_db SET equp_name=?,equp_type=?,equp_date=?,equp_price=? WHERE equp_id=?";
    db.query(sqlUpdate,[equp_name,equp_type,equp_date,equp_price,equp_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Service */

app.get("/Service/get",(req,res)=> {
    const sqlGet = "SELECT * FROM service_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Service/post",(req,res) => {
    const{service_equp,service_date,service_amt} = req.body;
    const sqlInsert = "INSERT INTO service_db(service_equp,service_date,service_amt) VALUES (?, ?, ?)";
    db.query(sqlInsert, [service_equp,service_date,service_amt], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Service/remove/:service_id",(req,res) => {
    const{ service_id } = req.params;
    const sqlRemove = "DELETE FROM service_db WHERE service_id = ?";
    db.query(sqlRemove, service_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Service/get/:service_id",(req,res)=> {
    const {service_id} = req.params;
    const sqlGet = "SELECT * FROM service_db WHERE service_id=?";
    db.query(sqlGet, service_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Service/update/:service_id",(req,res)=> {
    const {service_id} = req.params;
    const {service_equp,service_date,service_amt} = req.body;
    const sqlUpdate= "UPDATE service_db SET service_equp=?,service_date=?,service_amt=? WHERE service_id=?";
    db.query(sqlUpdate,[service_equp,service_date,service_amt,service_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

/* Message */
app.get("/Mail/get",(req,res)=> {
    const sqlGet = "SELECT * FROM patient_db WHERE patient_nvd IS NOT NULL ORDER BY patient_nvd ASC";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

/* Patient */

app.get("/Patient/get",(req,res)=> {
    const sqlGet = "SELECT * FROM patient_db";
    db.query(sqlGet,(error,result) => {
        res.send(result);
    });
});

app.post("/Patient/post",(req,res) => {
    const{patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt} = req.body;
    const sqlInsert = "INSERT INTO patient_db(patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sqlInsert, [patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt], (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/Patient/remove/:patient_id",(req,res) => {
    const{ patient_id } = req.params;
    const sqlRemove = "DELETE FROM patient_db WHERE patient_id = ?";
    db.query(sqlRemove, patient_id, (error,result)=> {
        if(error){
            console.log(error);
        }
    });
});

app.get("/Patient/get/:patient_id",(req,res)=> {
    const {patient_id} = req.params;
    const sqlGet = "SELECT * FROM patient_db WHERE patient_id=?";
    db.query(sqlGet, patient_id,(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/Patient/update/:patient_id",(req,res)=> {
    const {patient_id} = req.params;
    const {patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt} = req.body;
    const sqlUpdate= "UPDATE patient_db SET patient_number=?,patient_name=?,patient_address=?,patient_phn=?,patient_mail=?,patient_age=?,patient_gender=?,patient_prblm=?,patient_treatment=?,patient_dov=?,patient_nvd=?,patient_pendingamt=? WHERE patient_id=?";
    db.query(sqlUpdate,[patient_number,patient_name,patient_address,patient_phn,patient_mail,patient_age,patient_gender,patient_prblm,patient_treatment,patient_dov,patient_nvd,patient_pendingamt,patient_id],(error,result) => {
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});


/* Report */

app.get("/patient/PntReport/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM patient_db WHERE patient_dov BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/equip/Equip/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM equip_db WHERE equp_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/equipsales/EquipSales/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM service_db WHERE service_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/med/Med/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM medicinerestk_db WHERE restck_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/medsales/MedSales/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM sales_db WHERE sales_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/pntsurgeryr/PntSurgeryR/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM surgery_db WHERE surgery_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})

app.get("/grpsurgeryr/GrpSurgeryR/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT * FROM grpsurgery_db WHERE grpsurgery_date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    } )
})


app.listen(5000, () => {
    console.log("Server is running on port 5000");
})
