const { fetchArticleById } = require("../models/articles-model")

exports.getArticleById = async (req, res, next) => {
    try{
        const { article_id } = req.params
        const article = await fetchArticleById(article_id)
        return res.status(200).send({ article })
    } catch (err) {
        console.log(err)
        next(err)
    }
}