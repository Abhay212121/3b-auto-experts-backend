import { Router } from "express";
import { addNewProduct, addNewPurchase, addNewSale, getAllProducts } from "../contollers/productController.js";

const productRoute = Router()

productRoute.post('/addnew', addNewProduct)

productRoute.get('/getAll', getAllProducts)

productRoute.post('/saledata', addNewSale)

productRoute.post('/purchaseData', addNewPurchase)

export default productRoute