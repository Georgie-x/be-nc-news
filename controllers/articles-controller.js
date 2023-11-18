const {
	fetchArticleById,
	fetchArticles,
	fetchArticleComments,
	insertComment,
	updateArticle,
} = require("../models/articles-model.js")

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
		const { topic } = req.query
		const articles = await fetchArticles(topic)
		return res.status(200).send({ articles })
	} catch (err) {
		next(err)
	}
}
exports.getArticleComments = async (req, res, next) => {
	try {
		const { article_id } = req.params
		const comments = await fetchArticleComments(article_id)
		return res.status(200).send(comments)
	} catch (err) {
		next(err)
	}
}

exports.postComment = async (req, res, next) => {
	try {
		const newComment = req.body
		const { article_id } = req.params
		const comment = await insertComment(newComment, article_id)
		return res.status(201).send({ comment })
	} catch (err) {
		next(err)
	}
}

exports.patchArticle = async (req, res, next) => {
	try {
		const newUpdate = req.body
		const { article_id } = req.params
		const article = await updateArticle(newUpdate, article_id)
		return res.status(201).send({ article })
	} catch (err) {
		next(err)
	}
}
