const {
	fetchArticleById,
	fetchArticles,
	fetchArticleComments,
	updateArticle,
	insertArticle,
	insertComment,
} = require("../models/articles-model.js")

const getArticleById = async (req, res, next) => {
	try {
		const { article_id } = req.params
		const article = await fetchArticleById(article_id)
		return res.status(200).send({ article })
	} catch (err) {
		next(err)
	}
}

const getArticles = async (req, res, next) => {
	try {
		const { topic, sortby, order, limit, p } = req.query
		const articles = await fetchArticles(topic, sortby, order, limit, p)
		return res.status(200).send({ articles })
	} catch (err) {
		next(err)
	}
}

const getArticleComments = async (req, res, next) => {
	try {
		const { limit, p } = req.query
		const { article_id } = req.params
		const comments = await fetchArticleComments(article_id, limit, p)
		return res.status(200).send(comments)
	} catch (err) {
		next(err)
	}
}
const postComment = async (req, res, next) => {
	try {
		const newComment = req.body
		const { article_id } = req.params
		const comment = await insertComment(newComment, article_id)
		return res.status(201).send({ comment })
	} catch (err) {
		next(err)
	}
}
const patchArticle = async (req, res, next) => {
	try {
		const newUpdate = req.body
		const { article_id } = req.params
		const article = await updateArticle(newUpdate, article_id)
		return res.status(201).send({ article })
	} catch (err) {
		next(err)
	}
}

const postArticle = async (req, res, next) => {
	try {
		const newArticle = req.body
		const article = await insertArticle(newArticle)
		return res.status(201).send({ article })
	} catch (err) {
		next(err)
	}
}

module.exports = {
	getArticleById,
	getArticles,
	getArticleComments,
	patchArticle,
	postArticle,
	postComment,
}
