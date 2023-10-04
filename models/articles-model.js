const db = require("../db/connection")

exports.fetchArticleById = async (article_id) => {
    const query = `SELECT * FROM articles WHERE article_id = $1`   
    const body = await db.query(query, [article_id])
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "article id not found"})
    } else {
        return body.rows
    }        
}









exports.fetchArticleComments = async (article_id) => {
    const query = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`
    const body = await db.query(query, [article_id])
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "article id not found"})
    } else {
        return body.rows
    }
}