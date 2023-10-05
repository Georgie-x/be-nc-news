const { fetchArticleById, fetchArticles, fetchArticleComments } = require("../models/articles-model.js")

exports.getArticleById = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const article = await fetchArticleById(article_id)
        return res.status(200).send({ article })
    } catch (err) {   
        next(err)
    }
}

exports.getArticles = async (req, res, next) => {
    try {
        const articles = await fetchArticles()
        return res.status(200).send({ articles })
    } catch (err) {
        next(err)
    }

exports.getArticleComments = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const comments = await fetchArticleComments(article_id)
        return res.status(200).send(comments)
       } catch (err) {
        next(err)
       }
