import pool from "./pool.js";

const getUserByMail = async (usermail) => {
    const { rows } = await pool.query('SELECT * FROM users WHERE user_mail = $1', [usermail])
    return rows[0]
}

export default { getUserByMail }