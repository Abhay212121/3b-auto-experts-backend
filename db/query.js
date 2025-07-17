import pool from "./pool.js";

const getUserByMail = async (usermail) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_mail = $1', [usermail])
    return rows[0]
}

const addProductInDb = async (name, category, price) => {
    await pool.query(`INSERT INTO products(product_name,product_category,product_price) VALUES($1,$2,$3)`, [name, category, price])
}

const getAllProductsFromDb = async (req, res) => {
    const { rows } = await pool.query(`SELECT product_name,product_category FROM products`)
    return rows
}

const addSaleRecordInDb = async (product_category, product_name, selling_price, sold_by, sold_to_customer, sold_to_car, sold_on, payment_status, quantity) => {

    const result = await pool.query(`SELECT product_id FROM products WHERE product_name = $1`, [product_name])

    if (result.rows.length === 0) {
        throw new Error("Product not found in database.");
    }

    const productId = await result.rows[0].product_id
    console.log(productId)

    await pool.query(`INSERT INTO sales_records(product_category,product_name,product_id,quantity,selling_price,sold_by,sold_to_customer,sold_to_car,sold_on,payment_status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, [product_category, product_name, productId, quantity, selling_price, sold_by, sold_to_customer, sold_to_car, sold_on, payment_status])
}

const addPurchaseRecordInDb = async (productCategory, productName, purchasePrice, purchasedByUser, supplier) => {
    await pool.query(`INSERT INTO purchase_records(product_category,product_name,purchase_price,purchased_by,supplier) VALUES($1,$2,$3,$4,$5)`, [productCategory, productName, purchasePrice, purchasedByUser, supplier])
}

export default { getUserByMail, addProductInDb, getAllProductsFromDb, addSaleRecordInDb, addPurchaseRecordInDb }