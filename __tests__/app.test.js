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
    });
});

describe('GET /api/topics', () => {
    test('should return a status code of 200 and topics array on successful request', () => {
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