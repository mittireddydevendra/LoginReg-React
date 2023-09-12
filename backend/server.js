const express=require("express");
const mysql=require('mysql');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"signup"
})


app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    const duplicateEmail = `select * from login where email = ? `
    const duplicateName = `select * from login where name = ? `
    db.query(duplicateEmail,duplicateName[email],[name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (result.length > 0) {
            // Email already exists
            return res.status(400).json({ message: 'Email already exists' });
        }
        if (result.length > 0){
              // userName already exists 
            return res.status(400).json({ message: 'UserName already exists' });
        }
    
    const sql="INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
    const values=[
        name,
        email,
        password
    ]
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
    })
})


app.post('/login',(req,res)=>{
    const sql="SELECT * FROM login WHERE `email` = ? AND `password`=?";

    db.query(sql,[req.body.email, req.body.password],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        if(data.length>0){
            return res.json("Success");
        }else{
            return res.json("Failed");
        }
    })
})



app.listen(8081, ()=>{
    console.log("Listening");
})
