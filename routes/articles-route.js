const articlesRouter = require("express").Router()

const {
	getArticleById,
	getArticles,
	getArticleComments,
	patchArticle,
	postArticle,
	postComment,
} = require("../controllers/articles-controller")


articlesRouter.get("/", getArticles)
articlesRouter.post("/", postArticle)
articlesRouter.get("/:article_id", getArticleById)
articlesRouter.patch("/:article_id", patchArticle)
articlesRouter.get("/:article_id/comments", getArticleComments)
articlesRouter.post("/:article_id/comments", postComment)

module.exports =  articlesRouter 
