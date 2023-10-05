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

describe('404 Invalid api path', () => {
    test('should return a status code of 404 if path is invalid', () => {
        return request(app)
        .get("/api/invalidApi")
        .expect(404)
        .then(({ body }) => {  
            expect(body.message).toBe("invalid path")
            
        })
    })
})

describe('GET /api', () => {
    test('should return a status code of 200 and api details ', () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            expect(body.endpoints).toEqual(endpoints)
        })
    })
})

describe('GET /api/topics', () => {
    test('should return a status code of 200 and topics array', () => {
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

describe('GET /api/articles/:article_id', () => {

    test.skip('should return a status code of 200 and an article object with correct properties', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {         
            expect(typeof body.article.author).toBe("string")
            expect(typeof body.article.title).toBe("string")
            expect(typeof body.article.article_id).toBe("number")
            expect(typeof body.article.body).toBe("string")
            expect(typeof body.article.topic).toBe("string")
            expect(typeof body.article.created_at).toBe("string")
            expect(typeof body.article.votes).toBe("number")
            expect(typeof body.article.article_img_url).toBe("string")
        
        })
    })

    test('should return a status code of 400 and message if article_id is invalid', () => {
        return request(app)
        .get("/api/articles/notValid")
        .expect(400)
        .then(({ body }) => {        
            expect(body.message).toBe("invalid article id")
        
        })
    })

    test('should return a status code of 404 and message if article_id is not found', () => {
        return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {        
            expect(body.message).toBe("article id not found")
        
        })
    })
})

describe('GET /api/articles', () => {
    test('should return a status code of 200 and array of articles ordered by created_at', () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {  
            expect(body.articles).toBeSortedBy('created_at', { descending: true })
            expect(body.articles).toHaveLength(13)
            body.articles.forEach((article) => {       
            expect(typeof article.author).toBe("string")
            expect(typeof article.title).toBe("string")
            expect(typeof article.article_id).toBe("number")
            expect(typeof article.topic).toBe("string")
            expect(typeof article.created_at).toBe("string")
            expect(typeof article.votes).toBe("number")
            expect(typeof article.article_img_url).toBe("string")
            expect(typeof article.comment_count).toBe("string")

            })  
        })
    })
})

describe('GET /api/articles/:article_id/comments', () => {
    test('should return a status code of 200 and an array of comments for an article', () => {
        return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => { 
            expect(body).toHaveLength(11)
            expect(body).toBeSortedBy('created_at', { descending: true })
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

    test('should return a status code of 404 and message if article_id is not found', () => {
        return request(app)
        .get("/api/articles/9999/comments")
        .expect(404)
        .then(({ body }) => {       
            expect(body.message).toBe("article id not found")
        
        })
    })
    test('should return a status code of 400 and message if article_id is invalid', () => {
        return request(app)
        .get("/api/articles/notValid/comments")
        .expect(400)
        .then(({ body }) => {        
            expect(body.message).toBe("invalid article id")
        
        })
    })

    test('should return a status code of 200 and message if no comments are found', () => {
        return request(app)
        .get("/api/articles/13/comments")
        .expect(200)
        .then(({ body }) => {        
            expect(body.message).toBe("no comments found for this article")
        
        })
    })
})







// describe('POST /api/articles/:article_id/comments', () => {
//     test.only('should return a status code of 200 and newly posted comment', () => {
//         const newComment = { username: "rogersop", body: "Wow, this really is fantastic!"}
//         console.log(newComment.username)
//         return request(app)
//         .post("/api/articles/1/comments")
//         .send(newComment)
//         .expect(201)
//     });
// });
