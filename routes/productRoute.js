import { Router } from "express";
import { addNewProduct, addNewSale, getAllProducts } from "../contollers/productController.js";

const productRoute = Router()

productRoute.post('/addnew', addNewProduct)

productRoute.get('/getAll', getAllProducts)

productRoute.post('/saledata', addNewSale)

export default productRoute