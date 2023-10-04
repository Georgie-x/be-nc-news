const db = require("../db/connection")

exports.fetchTopics = async () => {  
    const query = `SELECT * FROM topics`
    const body = await db.query(query)
    return body.rows 
}