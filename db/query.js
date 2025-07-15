import pool from "./pool.js";

const getUserByMail = async (usermail) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_mail = $1', [usermail])
    return rows[0]
}

const addProductInDb = async (name, category, price) => {
    await pool.query(`INSERT INTO products(product_name,product_category,product_price) VALUES($1,$2,$3)`, [name, category, price])
}

export default { getUserByMail, addProductInDb }