const db = require("../db/connection")

exports.fetchTopics = async (req, res, next) => {
    try{
        const query = `SELECT * FROM topics`
        const body = await db.query(query)
        return body.rows
    } catch {
        next(err)
    }
}