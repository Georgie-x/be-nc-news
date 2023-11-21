const db = require("../db/connection")

const fetchArticleById = async (article_id) => {
	const query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count
    FROM articles
    LEFT JOIN comments
    ON articles.article_id = comments.article_id
	WHERE articles.article_id = $1
	GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url`
	const body = await db.query(query, [article_id])
	if (body.rows.length === 0) {
		return Promise.reject({ status: 404, message: "article id not found" })
	} else {
		return body.rows[0]
	}
}

const fetchArticles = async (topic, sortby, order, limit, p) => {

	const validTopic = ['mitch', 'cats', 'cooking', 'coding', 'sports']
	const validSortBy = [
		'author',
		'title',
		'article_id',
		'topic',
		'created_at',
		'votes',
		'article_img_url',
		'comment_count',
	]
	const validOrder = ['ASC', 'DESC']

	// if (topic && !validTopic.includes(topic)) {
	// 	return Promise.reject({ status: 400, message: "topic not found" })
	// }
	// if (sortby && !validSortBy.includes(sortby)) {
	// 	return Promise.reject({ status: 400, message: "sortby not found" })
	// }
	// if (order && !validOrder.includes(order)) {
	// 	return Promise.reject({ status: 400, message: "order should be desc or asc" })
	// }
	// if (isNaN(limit)) {
	// 	return Promise.reject({ status: 400, message: "page limit should be a number" })
	// }
	// if (isNaN(p)) {
	// 	return Promise.reject({ status: 400, message: "page should be a number" })
	// }


	let query = `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count, COUNT(articles.article_id) AS total_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id`

	const values = []

	if (topic) {
		query += ` WHERE articles.topic = $${values.length + 1}`
		values.push(topic)
	}

	sortby = sortby || `created_at`
	order = order || `DESC`
	limit = Number(limit) || 10
	p = p || 1

	query += ` GROUP BY articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url ORDER BY $${
		values.length + 1
	}::varchar ${order}`
	values.push(sortby)

	query += ` LIMIT $${values.length + 1}::int`
	values.push(limit)
	
	query += ` OFFSET $${values.length + 1}::int`
	values.push((p - 1) * limit)

	

	const body = await db.query(query, values)
	
	if (body.rows.length === 0) {
		return Promise.reject({ status: 404, message: "no articles found" })
	} else {
		return body.rows
	}
}

const fetchArticleComments = async (article_id, limit, p) => {
	article_id = Number(article_id)
	limit = limit || 10
	p = p || 1

	const validArticle = await fetchArticleById(article_id)
	if (validArticle.length === 0) {
		return Promise.reject({ status: 404, message: "article id not found" })
	}

	if (isNaN(limit)) {
		return Promise.reject({
			status: 400,
			message: "page limit should be a number",
		})
	}

	if (isNaN(p)) {
		return Promise.reject({ status: 400, message: "page should be a number" })
	}

	const offset = (p - 1) * limit
	let query = `
	SELECT * FROM comments 
	WHERE article_id = $1 
	ORDER BY created_at DESC 
	LIMIT $2 OFFSET $3`

	const values = [article_id, limit, offset]
	const body = await db.query(query, values)

	if (body.rows.length === 0) {
		return Promise.reject({
			status: 200,
			message: "no comments found for this article",
		})
	} else {
		return body.rows
	}
}

const insertComment = async (newComment, article_id) => {
	const validArticle = await fetchArticleById(article_id)
	if (validArticle.length === 0) {
		return Promise.reject({ status: 404, message: "article id not found" })
	}

	const { username, body } = newComment

	const validUsername = await db.query(`SELECT username FROM users WHERE username = $1`, [username])
	if (validUsername.rowCount === 0) {
		return Promise.reject({ status: 404, message: "username not found" })
	}

	if (typeof body != "string") {
		return Promise.reject({ status: 400, message: "comment not valid" })
	}

	const query = `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`

	const result = await db.query(query, [username, body, article_id])
	return result.rows[0]
}

const updateArticle = async (newUpdate, article_id) => {
	const validArticle = await fetchArticleById(article_id)
	if (validArticle.length === 0) {
		return Promise.reject({ status: 404, message: "article id not found" })
	}

	const { inc_votes } = newUpdate
	const query = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`

	const body = await db.query(query, [inc_votes, article_id])
	return body.rows[0]
}

const insertArticle = async (newArticle) => {
	const { author, title, body, topic, article_img_url } = newArticle

	if (typeof body != "string") {
		return Promise.reject({ status: 400, message: "Article not valid" })
	}
	const query = `INSERT INTO articles (author, title, body, topic, article_img_url) VALUES ($1, $2, $3, $4, $5) RETURNING *`

	const result = await db.query(query, [author, title, body, topic, article_img_url])

	const finalResult = { ...result.rows[0], comment_count: 0 }
	return finalResult
}

module.exports = {
	fetchArticleById,
	fetchArticles,
	insertComment,
	fetchArticleComments,
	updateArticle,
	insertArticle,
}
