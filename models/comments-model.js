const db = require("../db/connection")



const removeComment = async (comment_id) => {
    const query = `DELETE FROM comments WHERE comment_id = $1`   
    const result = await db.query(query, [comment_id])

    if (result.rowCount != 1) {
        return Promise.reject({ status: 404, message: "comment id not found"})
    } else {
        return 204
    }        
}


const updateComment = async (newComment, comment_id) => {
    const { inc_votes } = newComment
	const query = `UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *`

	const body = await db.query(query, [inc_votes, comment_id])
	return body.rows[0]
}





module.exports = {removeComment, updateComment}


