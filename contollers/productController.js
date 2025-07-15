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

export { addNewProduct }