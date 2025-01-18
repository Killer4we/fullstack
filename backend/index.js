import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
const app = express();
dotenv.config();
app.use(express.json()); //This allows us to accept json data in the body. -> It is a middleware

app.get('/',(req,res)=>{
    res.send("Server is ready!!!");
})
app.use('/api/products',productRoutes);
app.listen(5000,()=>{
    console.log("Server started at 5000 port");
    connectDB();
})