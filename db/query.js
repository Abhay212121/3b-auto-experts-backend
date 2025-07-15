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

const addRecordInDb = async (product_category, product_name, selling_price, sold_by, sold_to, sold_on, payment_status) => {
    await pool.query(`INSERT INTO sales_records(product_category,product_name,selling_price,sold_by,sold_to,sold_on,payment_status) VALUES($1,$2,$3,$4,$5,$6,$7)`, [product_category, product_name, selling_price, sold_by, sold_to, sold_on, payment_status])
}

export default { getUserByMail, addProductInDb, getAllProductsFromDb, addRecordInDb }