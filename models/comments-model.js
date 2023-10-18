const db = require("../db/connection")

exports.removeComment = async (comment_id) => {
    const query = `DELETE FROM comments WHERE comment_id = $1`   
    const result = await db.query(query, [comment_id])
    if (result.rowCount != 1) {
        return Promise.reject({ status: 404, message: "comment id not found"})
    } else {
        return 204
    }        
}


