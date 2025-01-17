import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";



const app = express();
dotenv.config();
app.use(express.json()); //This allows us to accept json data in the body. -> It is a middleware

app.get('/',(req,res)=>{
    res.send("Server is ready!!!");
})


//Now I will be creating an api to get all the products present in the store
app.get("/api/products",async (req,res)=>{
    try{
        const products = await Product.find({}); // By using this we are getting all the products that are present in the store or saved in the database
        res.status(200).json({"success":"true",data:products,"message":"Successfully fetched all the products"});
    }catch(error){
        res.status(500).json({"success":"false","message":"Error fetching products"});
    }
});



//This api is for creating a product
app.post("/api/products", async (req,res)=>{
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

//This api is for deleting a product
app.delete("/api/products/:id",async (req,res)=>{
    const {id} = req.params; //destructuring the id from the parameters so that i can get the object id which will be used for deletion
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({"success":"true","message":"Product successfully deleted"});
    }catch(error){
        res.status(404).json({"success":"false","message":"product not found"});
    }
});

//This api is for updating an already existing product
app.patch("/api/products/:id",async (req,res)=>{
    const {id} = req.params;
    const product = req.body;
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true}); // new:true -> it will return the updated product instead of returning the old product
        res.status(200).json({"success":"true",data:updatedProduct,"message":"Successfully updated the product"});
    }catch(error){
        res.status(500).json({"success":"false","message":"Failed updating the product"});
    }
});

app.listen(5000,()=>{
    console.log("Server started at 5000 port");
    connectDB();
})