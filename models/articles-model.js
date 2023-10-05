const db = require("../db/connection")

const fetchArticleById = async (article_id) => {
    const query = `SELECT * FROM articles WHERE article_id = $1`   
    const body = await db.query(query, [article_id])
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "article id not found"})
    } else {
        return body.rows[0]
    }        
}

const fetchArticles = async () => {
    const query = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.author, articles.title, articles.article_id
    ORDER BY articles.created_at DESC
    `
    const body = await db.query(query) 
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "no articles found"})
    } else {
    return body.rows
    }
}

const fetchArticleComments = async (article_id) => {
    const validArticle = await fetchArticleById(article_id)
    if (validArticle.length === 0) {
        return Promise.reject({ status: 404, message: "article id not found"})
    }
    
    const query = `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`
    const body = await db.query(query, [article_id])

    if (body.rows.length === 0) {
        return Promise.reject({ status: 200, message: "no comments found for this article"})
    } else {
        return body.rows
    }
}










exports.insertComment = async (newComment)=> {
    const query = `INSERT INTO comments(username, body)
    VALUES ($1, $2)
    RETURNING *`
    const body = await db.query(query, [newComment.username, newComment.body])
    return body.rows[0]
    

}
module.exports = {fetchArticleById, fetchArticles, fetchArticleComments}
