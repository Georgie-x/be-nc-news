const db = require("../db/connection")

const fetchTopics = async () => {  
    const query = `SELECT * FROM topics`
    const body = await db.query(query)
    return body.rows 
}

const insertTopic = async (slug, description) => {
    if (typeof slug !== "string") {
        return Promise.reject({ status: 400, message: "slug not valid" })
    } 
    if (typeof description !== "string") {
        return Promise.reject({ status: 400, message: "description not valid" })
    } 

    const query = `INSERT INTO topics (slug, description) VALUES ($1, $2) RETURNING *`
    const body = await db.query(query, [slug, description])
    return body.rows[0] 
}


module.exports = {fetchTopics, insertTopic}