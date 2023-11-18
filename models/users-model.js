const db = require("../db/connection")

const fetchUsers = async () => {
    const query = `
    SELECT username, name, avatar_url
    FROM users
    `
    const body = await db.query(query) 
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "no users found"})
    } else {
    return body.rows
    }
}


module.exports = {fetchUsers}