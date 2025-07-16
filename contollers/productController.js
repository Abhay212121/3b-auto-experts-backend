import db from '../db/query.js'

const addNewProduct = async (req, res) => {
    const { productName, productCategory, price } = req.body.productData
    try {
        await db.addProductInDb(productName, productCategory, price)
        return res.json({ status: 200, msg: 'Product added!' })
    } catch (error) {
        return res.json({ status: 500, msg: error })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const productArr = await db.getAllProductsFromDb()
        return res.json({ status: 200, productData: productArr })
    } catch (error) {
        return res.json({ status: 500, msg: error })
    }
}

const addNewSale = async (req, res) => {
    console.log(req.body.data)
    const { productCategory, productName, soldAtPrice, soldByUser, soldForCar, soldOnDate, paymentStatus } = req.body.data

    try {
        await db.addSaleRecordInDb(productCategory, productName, soldAtPrice, soldByUser, soldForCar, soldOnDate, paymentStatus)
        res.json({ status: 200, msg: 'Record added!' })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

const addNewPurchase = async (req, res) => {
    const { productCategory, productName, purchasePrice, purchasedByUser, supplier } = req.body.data
    console.log(productCategory, productName, purchasePrice, purchasedByUser, supplier)

    try {
        await db.addPurchaseRecordInDb(productCategory, productName, purchasePrice, purchasedByUser, supplier)
        await db.addProductInDb(productName, productCategory, purchasePrice)
        res.json({ status: 200, msg: 'Record added!' })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

export { addNewProduct, getAllProducts, addNewSale, addNewPurchase }