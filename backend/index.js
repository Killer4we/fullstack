import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";


const app = express();
dotenv.config();


app.get('/',(req,res)=>{
    res.send("Server is ready!!!");
})


app.listen(5000,()=>{
    console.log("Server started at 5000 port");
    connectDB();
})