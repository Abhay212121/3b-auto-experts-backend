import { Router } from "express";
import { addNewProduct } from "../contollers/productController.js";

const productRoute = Router()

productRoute.post('/addnew', addNewProduct)

export default productRoute