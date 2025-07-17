import db from '../db/query.js'

const getHomeData = (req, res) => {

    try {

    } catch (error) {
        res.json({ status: 500, msg: error.message })
    }
}

export { getHomeData }