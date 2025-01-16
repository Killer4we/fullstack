import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";


const app = express();
dotenv.config();


app.get('/',(req,res)=>{
    res.send("Server is ready!!!");
})

app.post("/products", async (req,res)=>{
    const product = req.body;
    if(!product.name || !product.image || !product.price) {
        return res.status(400).json({success:false,message:"Please provide all the required fields"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success:true,data:newProduct,message:"Product created successfully"});
    } catch(error){
        console.error("Error saving the product");
        res.statusCode(500).json({success:false,message:"Sever Error"});
    }
});

app.listen(5000,()=>{
    console.log("Server started at 5000 port");
    connectDB();
})