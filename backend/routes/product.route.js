import mongoose from "mongoose";
import express from "express";
// import Product from "../models/product.model.js";
import { createProducts, deleteProducts, getProducts, getSingleProduct, updateProducts } from "../controllers/product.controller.js";
const router  = express.Router();

//Now I will be creating an api to get all the products present in the store
router.get("/",getProducts);

//This api is for creating a product
router.post("/",createProducts);

//This api is for deleting a product
router.delete("/:id",deleteProducts);

//This api is for updating an already existing product
router.patch("/:id",updateProducts);

//This api is for getting the details of a single product
router.get("/:id",getSingleProduct);

export default router;