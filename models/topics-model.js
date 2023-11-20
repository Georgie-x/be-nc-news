const db = require("../db/connection")

const fetchTopics = async () => {  
    const query = `SELECT * FROM topics`
    const body = await db.query(query)
    return body.rows 
}


module.exports = {fetchTopics}