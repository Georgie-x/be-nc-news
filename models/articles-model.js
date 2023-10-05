const db = require("../db/connection")

exports.fetchArticleById = async (article_id) => {
    const query = `SELECT * FROM articles WHERE article_id = $1`   
    const body = await db.query(query, [article_id])
    if (body.rows.length === 0) {
        return Promise.reject({ status: 404, message: "article id not found"})
    } else {
        return body.rows[0]  
}}

exports.fetchArticles = async () => {
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
}}