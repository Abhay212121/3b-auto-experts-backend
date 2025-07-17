import bcrypt from 'bcrypt'
import db from '../db/query.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const userLogin = async (req, res) => {
    const { email, password } = req.body.userData
    try {
        const user = await db.getUserByMail(email)
        console.log(user)

        if (!user) {
            return res.json({ status: 404, msg: 'User Not found!' })
        }

        const isMatch = await bcrypt.compare(password, user.user_password)
        if (!isMatch) {
            return res.json({ status: 409, msg: 'Incorrect Password!' })
        }

        const payload = {
            userId: user.user_id
        }

        const token = jwt.sign(payload, process.env.MY_SECRET_KEY)
        return res.json({ status: 200, userId: user.user_id, token: token })

    } catch (error) {
        return res.json({ status: 500, msg: 'Internal Server Error' })
    }
}

const fetchUserData = async (req, res) => {
    const { name } = req.query
    try {
        const result = await db.getHomeDataFromDbByUser(name?.toLowerCase())
        return res.json({ status: 200, data: result })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

export { userLogin, fetchUserData }