import db from '../db/query.js'

const getHomeData = async (req, res) => {

    try {
        const data = await db.getHomeDataFromDb()
        return res.json({ status: 200, data: data })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}

export { getHomeData }