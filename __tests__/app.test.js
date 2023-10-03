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
    db.end
})

describe('404 Invalid api path', () => {
    test('should should return a status code of 404 if path is invalid', () => {
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

    test('should return a status code of 200 and an article object with correct properties', () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {         
            expect(typeof body.article[0].author).toBe("string")
            expect(typeof body.article[0].title).toBe("string")
            expect(typeof body.article[0].article_id).toBe("number")
            expect(typeof body.article[0].body).toBe("string")
            expect(typeof body.article[0].topic).toBe("string")
            expect(typeof body.article[0].created_at).toBe("string")
            expect(typeof body.article[0].votes).toBe("number")
            expect(typeof body.article[0].article_img_url).toBe("string")
        
        })
    })

    test('should return a status code of 400 and message if article_id is invalid', () => {
        return request(app)
        .get("/api/articles/notValid")
        .expect(400)
        .then(({ body }) => {   
            console.log(body)      
            expect(body.message).toBe("invalid article id")
        
        })
    })

    test('should return a status code of 404 and message if article_id is not found', () => {
        return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {   
            console.log(body)      
            expect(body.message).toBe("article id not found")
        
        })
    })
})