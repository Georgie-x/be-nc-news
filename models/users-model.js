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

const fetchUser = async (username) => {
    const query = `
    SELECT username, name, avatar_url
    FROM users
    WHERE username = $1
    `
    const body = await db.query(query, [username]) 
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "no users found"})
    } else {
    return body.rows
    }
}





module.exports = {fetchUsers, fetchUser}