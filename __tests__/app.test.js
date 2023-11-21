const app = require("../app.js")
const request = require("supertest")
const db = require("../db/connection")
const data = require("../db/data/test-data/index.js")
const seed = require("../db/seeds/seed.js")
const endpoints = require("../endpoints.json")

beforeEach(() => {
	return seed(data)
})
afterAll(() => {
	db.end()
})

describe("404 Invalid api path", () => {
	test("should return a status code of 404 if path is invalid", () => {
		return request(app)
			.get("/api/invalidApi")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("invalid path")
			})
	})
})

describe("GET /api", () => {
	test("should return a status code of 200 and api details ", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body }) => {
				expect(body.endpoints).toEqual(endpoints)
			})
	})
})

describe("GET /api/topics", () => {
	test("should return a status code of 200 and topics array", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body }) => {
				expect(body.topics).toHaveLength(3)
				body.topics.forEach((topic) => {
					expect(typeof topic.slug).toBe("string")
					expect(typeof topic.description).toBe("string")
				})
			})
	})
})

describe("POST /api/topics", () => {
	test("should return a status code of 201 and new topic", () => {
		const newTopic = { slug: "dinosaurs", description: "the big guys from ages ago" }
		return request(app)
			.post("/api/topics")
			.send(newTopic)
			.expect(201)
			.then(({ body }) => {
				expect(body.topic).toMatchObject({
					slug: "dinosaurs",
					description: "the big guys from ages ago",
				})
			})
	})

	test("should return a status code of 400 if topic slug is invalid", () => {
		const newTopic = { slug: 0, description: "the big guys from ages ago" }
		return request(app).post("/api/topics").send(newTopic).expect(400)
	})
	test("should return a status code of 400 if topic description is invalid", () => {
		const newTopic = { slug: 'dinosaurs', description: 0 }
		return request(app).post("/api/topics").send(newTopic).expect(400)
	})


})

describe("GET /api/articles", () => {
	test("should return a status code of 200 and array of articles ordered by created_at", () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
			.then(({ body }) => {
				expect(body.articles).toHaveLength(10)
				body.articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						article_id: expect.any(Number),
						topic: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						article_img_url: expect.any(String),
						comment_count: expect.any(String),
					})
				})
			})
	})

	test("should return a status code of 200 and array of articles filtered by topic", () => {
		return request(app)
			.get("/api/articles?topic=cats")
			.expect(200)
			.then(({ body }) => {
				expect(body.articles).toHaveLength(1)
				body.articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						article_id: expect.any(Number),
						topic: "cats",
						created_at: expect.any(String),
						votes: expect.any(Number),
						article_img_url: expect.any(String),
						comment_count: expect.any(String),
					})
				})
			})
	})
	test("should return a status code of 200 and array of 5 articles when limit query is included", () => {
		return request(app)
			.get("/api/articles?limit=5")
			.expect(200)
			.then(({ body }) => {
				expect(body.articles).toHaveLength(5)
				body.articles.forEach((article) => {
					expect(article).toMatchObject({
						author: expect.any(String),
						title: expect.any(String),
						article_id: expect.any(Number),
						topic: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						article_img_url: expect.any(String),
						comment_count: expect.any(String),
						total_count: expect.any(String),
					})
				})
			})
	})
	test("should return a status code of 404 and message if topic is invalid", () => {
		return request(app)
			.get("/api/articles?topic=cast")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("topic not found")
			})
	})
	test("should return a status code of 404 and message if sortby is invalid", () => {
		return request(app)
			.get("/api/articles?sortby=cast")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("sortby not found")
			})
	})
	test("should return a status code of 404 and message if order is invalid", () => {
		return request(app)
			.get("/api/articles?sortby=created_in")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("sortby not found")
			})
	})
})

describe("POST /api/articles", () => {
	test("should return a status code of 201 and newly posted article", () => {
		const newArticle = {
			author: "rogersop",
			title: "here's a cat",
			body: "I love cats so much!",
			topic: "cats",
			article_img_url:
				"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
		}
		return request(app)
			.post("/api/articles/")
			.send(newArticle)
			.expect(201)
			.then(({ body }) => {
				expect(body.article).toMatchObject({
					author: "rogersop",
					title: "here's a cat",
					body: "I love cats so much!",
					topic: "cats",
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					article_id: 14,
					comment_count: 0,
					created_at: expect.any(String),
					votes: 0,
				})
			})
	})
})

describe("GET /api/articles/:article_id", () => {
	test("should return a status code of 200 and an article object with correct properties", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then(({ body }) => {
				expect(body.article).toMatchObject({
					author: "butter_bridge",
					title: "Living in the shadow of a great man",
					article_id: 1,
					topic: "mitch",
					created_at: "2020-07-09T20:11:00.000Z",
					votes: 100,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					comment_count: "11",
				})
			})
	})

	test("should return a status code of 400 and message if article_id is invalid", () => {
		return request(app)
			.get("/api/articles/notValid")
			.expect(400)
			.then(({ body }) => {
				expect(body.message).toBe("Invalid input")
			})
	})

	test("should return a status code of 404 and message if article_id is not found", () => {
		return request(app)
			.get("/api/articles/9999")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("article id not found")
			})
	})
})
describe("PATCH /api/articles/:article_id", () => {
	test("should return a status code of 200 and the updated article", () => {
		const newUpdate = { inc_votes: 33 }
		return request(app)
			.patch("/api/articles/13")
			.send(newUpdate)
			.expect(201)
			.then(({ body }) => {
				expect(body.article).toMatchObject({
					author: expect.any(String),
					title: expect.any(String),
					body: expect.any(String),
					article_id: 13,
					topic: expect.any(String),
					created_at: expect.any(String),
					votes: 33,
				})
			})
	})

	test("should return a status code of 404 and message if article_id is not found", () => {
		const newUpdate = { inc_votes: 33 }
		return request(app).patch("/api/articles/9999").send(newUpdate).expect(404)
	})

	test("should return a status code of 400 and message if article_id is invalid", () => {
		const newUpdate = { inc_votes: 33 }
		return request(app).patch("/api/articles/notValid").send(newUpdate).expect(400)
	})

	test("should return a status code of 400 and message if inc_votes is invalid", () => {
		const newUpdate = { inc_votes: "notValid" }
		return request(app).patch("/api/articles/13").send(newUpdate).expect(400)
	})
})

describe("GET /api/articles/:article_id/comments", () => {
	test("should return a status code of 200 and an array of comments for an article", () => {
		return request(app)
			.get("/api/articles/1/comments")
			.expect(200)
			.then(({ body }) => {
				expect(body).toHaveLength(10)
				expect(body).toBeSortedBy("created_at", { descending: true })
				body.forEach((comment) => {
					expect(typeof comment.comment_id).toBe("number")
					expect(typeof comment.votes).toBe("number")
					expect(typeof comment.created_at).toBe("string")
					expect(typeof comment.author).toBe("string")
					expect(typeof comment.body).toBe("string")
					expect(typeof comment.article_id).toBe("number")
				})
			})
	})

	test("should return a status code of 200 and array of 5 comments when limit query is included", () => {
		return request(app)
			.get("/api/articles/1/comments?limit=5")
			.expect(200)
			.then(({ body }) => {
				expect(body).toHaveLength(5)
				body.forEach((comment) => {
					expect(comment).toMatchObject({
						author: expect.any(String),
						body: expect.any(String),
						article_id: expect.any(Number),
						comment_id: expect.any(Number),
						created_at: expect.any(String),
						votes: expect.any(Number),
					})
				})
			})
	})

	test("should return a status code of 404 and message if article_id is not found", () => {
		return request(app)
			.get("/api/articles/9999/comments")
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("article id not found")
			})
	})

	test("should return a status code of 400 and message if article_id is invalid", () => {
		return request(app)
			.get("/api/articles/notValid/comments")
			.expect(400)
			.then(({ body }) => {
				expect(body.message).toBe("Invalid input")
			})
	})

	test("should return a status code of 200 and message if no comments are found", () => {
		return request(app)
			.get("/api/articles/13/comments")
			.expect(200)
			.then(({ body }) => {
				expect(body.message).toBe("no comments found for this article")
			})
	})
})
describe("POST /api/articles/:article_id/comments", () => {
	test("should return a status code of 201 and newly posted comment", () => {
		const newComment = {
			username: "rogersop",
			body: "Wow, this really is fantastic!",
		}
		return request(app)
			.post("/api/articles/13/comments")
			.send(newComment)
			.expect(201)
			.then(({ body }) => {
				expect(body.comment).toMatchObject({
					author: "rogersop",
					body: expect.any(String),
					article_id: 13,
					comment_id: 19,
					created_at: expect.any(String),
					votes: 0,
				})
			})
	})

	test("should return a status code of 404 and message if article_id is not found", () => {
		const newComment = {
			username: "rogersop",
			body: "Wow, this really is fantastic!",
		}
		return request(app).post("/api/articles/9999/comments").send(newComment).expect(404)
	})
	test("should return a status code of 400 and message if article_id is invalid", () => {
		const newComment = {
			username: "rogersop",
			body: "Wow, this really is fantastic!",
		}
		return request(app).post("/api/articles/notValid/comments").send(newComment).expect(400)
	})
	test("should return a status code of 404 and message if username is not found", () => {
		const newComment = {
			username: "notUser",
			body: "Wow, this really is fantastic!",
		}
		return request(app)
			.post("/api/articles/1/comments")
			.send(newComment)
			.expect(404)
			.then(({ body }) => {
				expect(body.message).toBe("username not found")
			})
	})
	test("should return a status code of 400 and message if comment is invalid", () => {
		const newComment = { username: "rogersop", body: 6 }
		return request(app).post("/api/articles/1/comments").send(newComment).expect(400)
	})
})

describe("PATCH /api/comments/:comment_id", () => {
	test("should return a status code of 200 and the updated comment", () => {
		const newUpdate = { inc_votes: 33 }
		return request(app)
			.patch("/api/comments/1")
			.send(newUpdate)
			.expect(200)
			.then(({ body }) => {
				expect(body.comment).toMatchObject({
					comment_id: 1,
					body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
					article_id: 9,
					author: "butter_bridge",
					votes: 49,
					created_at: "2020-04-06T12:17:00.000Z",
				})
			})
	})
})
describe("DELETE /api/comments/:comment_id", () => {
	test("should return a status code of 204 and no content", () => {
		return request(app).delete("/api/comments/1").send().expect(204)
	})

	test("should return a status code of 404 and message if comment_id is not found", () => {
		return request(app).delete("/api/comments/9999").send().expect(404)
	})

	test("should return a status code of 400 and message if comment_id is invalid", () => {
		return request(app).delete("/api/comments/notValid").send().expect(400)
	})
})

describe("GET /api/users", () => {
	test("should return an array of all user details ", () => {
		return request(app)
			.get("/api/users")
			.expect(200)
			.then(({ body }) => {
				expect(body.users).toHaveLength(4)
				body.users.forEach((user) => {
					expect(user).toMatchObject({
						username: expect.any(String),
						name: expect.any(String),
						avatar_url: expect.any(String),
					})
				})
			})
	})
})

describe("GET /api/users/:username", () => {
	test("should return user details ", () => {
		return request(app)
			.get("/api/users/lurker")
			.expect(200)
			.then(({ body }) => {
				expect(body.user[0]).toMatchObject({
					username: expect.any(String),
					name: expect.any(String),
					avatar_url: expect.any(String),
				})
			})
	})
})
