const assert = require('chai').assert
let chai = require('chai')
let chaiHttp = require("chai-http");
var request = require('supertest');
var app = require('../server/index.js')
chai.use(chaiHttp)
chai.should()

describe('App', () => {
    before(function (done) {
        this.timeout(10000)
        request(app).delete('/deleteAll').expect(200).end((err, res) => {
            if (err)
                return done(err)
            done()

        })
    })
    afterEach(function (done) {
        this.timeout(10000)
        request(app).delete('/deleteAll').expect(200).end((err, res) => {
            if (err)
                return done(err)
            done()
        })
    })
    after(function(done){
        process.exit(0)
    })
    it('app should register client', (done) => {

        request(app).post('/register').send({ RegisterUsername: 'sufyarny', RegisterPassword: 'super123' }).expect(200).end((err, res) => {
            if (err)
                return done(err)
            done()


        })



    })
    it('app should not allow duplicate registration', async () => {
        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'shehzman', RegisterPassword: 'shehzman2000' })
            let test2 = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'shehzman', RegisterPassword: 'shehzman2000' })
            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(400)
        }
        finally {
            requester.close()
        }

    });

    it('app should allow login of user', async () => {

        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'shehzman', RegisterPassword: 'shehzman2000' })
            let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'shehzman', password: 'shehzman2000' })
            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(200)
        }
        finally {
            requester.close()
        }
    })
    it('app should not login user', (done) => {
        request(app).post('/login').set('Content-Type', 'application/json').send({ username: 'shehzman', password: 'suer123' }).expect(401).end((err, res) => {
            if (err)
                return done(err)
            done()
        })
    }
    )
    it('app should not get user profile', (done) => {

        request(app).get('/profile').set('Content-Type', 'application/json').expect(401).end((err, res) => {
            if (err)
                return done(err)
            done()
        })
    })
    it('app should get user profile', async () => {
        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'shehzman', RegisterPassword: 'shehzman2000' })
            let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'shehzman', password: 'shehzman2000' })
            let token = test2.body.token
            let test3 = await requester.get('/profile').set('Authorization', `Bearer ${token}`)

            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(200)
            chai.expect(test3.statusCode).to.equal(200)
        }
        finally {
            requester.close()
        }
    })
    it('app should not change profile', async () => {
        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'shehzman', RegisterPassword: 'shehzman2000' })
            let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'shehzman', password: 'shehzman2000' })
            let token = test2.body.token
            let test3 = await requester.post('/profile').set('Authorization', `Bearer`).send({})

            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(200)
            chai.expect(test3.statusCode).to.equal(401)
        }
        finally {
            requester.close()
        }
    })
    it('app should change profile', async () => {
        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'sufman', RegisterPassword: 'sufy1234456' })
            let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'sufman', password: 'sufy1234456' })
            let token = test2.body.token
            let test3 = await requester.post('/profile').set('Authorization', `Bearer ${token}`).send({ name: 'shehzad yousaf', zipcode: '77498', state: 'TX', address: '11324 apple hill', city: 'austin' })

            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(200)
            chai.expect(test3.statusCode).to.equal(200)
        }
        finally {
            requester.close()
        }
    })
    it('app should get history of quotes', async () => {
        let requester = chai.request(app).keepOpen()
        try {
            let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'sufman', RegisterPassword: 'sufy1234456' })
            let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'sufman', password: 'sufy1234456' })
            let token = test2.body.token
            let test3 = await requester.get('/showTable').set('Authorization', `Bearer ${token}`)

            chai.expect(test.statusCode).to.equal(200)
            chai.expect(test2.statusCode).to.equal(200)
            chai.expect(test3.statusCode).to.equal(200)
        }
        finally {
            requester.close()
        }
        

    })


it('app should not get history of quotes', (done) => {
    request(app).get('/showtable').expect(401).end((err, res) => {


        if (err)
            return done(err)
        done()

    })




})
it('app should not get profile', (done) => {
    request(app).get('/profile').set('Authorization', `Bearer yoooooo`).expect(403).end((err, res) => {
        if (err)
            return done(err)
        done()
    })
})
it('app should not set profile due to insufficient input', async () => {
    let requester = chai.request(app).keepOpen()
    try {
        let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'kashish', RegisterPassword: 'sufy1234456' })
        let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'kashish', password: 'sufy1234456' })
        let token = test2.body.token
        let test3 = await requester.post('/profile').set('Authorization', `Bearer ${token}`).send({  zipcode: '77498', state: 'TX', address: '11324 apple hill', city: 'austin' })

        chai.expect(test.statusCode).to.equal(200)
        chai.expect(test2.statusCode).to.equal(200)
        chai.expect(test3.statusCode).to.equal(400)
    }
    finally {
        requester.close()
    }
})
it('app should get profile', async() => {
    let requester = chai.request(app).keepOpen()
    try {
        let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'kashish', RegisterPassword: 'sufy1234456' })
        let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'kashish', password: 'sufy1234456' })
        let token = test2.body.token
        let test3 = await requester.get('/profile').set('Authorization', `Bearer ${token}`)

        chai.expect(test.statusCode).to.equal(200)
        chai.expect(test2.statusCode).to.equal(200)
        chai.expect(test3.statusCode).to.equal(200)
    }
    finally {
        requester.close()
    }
})
it('app should get price', async()=>{
    let requester = chai.request(app).keepOpen()
    try {
        let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'kashish', RegisterPassword: 'sufy1234456' })
        let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'kashish', password: 'sufy1234456' })
        let token = test2.body.token
        let test3 = await requester.post('/profile').set('Authorization', `Bearer ${token}`).send({ name: 'shehzad yousaf', zipcode: '77498', state: 'TX', address: '11324 apple hill', city: 'austin' })
        let test4 = await requester.get('/getPrice?gallonsRequested=1100').set('Authorization', `Bearer ${token}`)

        chai.expect(test.statusCode).to.equal(200)
        chai.expect(test2.statusCode).to.equal(200)
        chai.expect(test3.statusCode).to.equal(200)
        chai.expect(test4.statusCode).to.equal(200)
        assert.equal(parseFloat(test4.body.margin).toFixed(2),.21)
        assert.equal(parseFloat(test4.body.suggestedPricePerGallon).toFixed(2),1.71)
        assert.equal(parseFloat(test4.body.totalAmountDue).toFixed(2),1881)
    }
    finally {
        requester.close()
    }
})

it('app should add quote history',async ()=>{
    let requester = chai.request(app).keepOpen()
    try {
        let test = await requester.post('/register').set('Content-Type', 'application/json').send({ RegisterUsername: 'kashish', RegisterPassword: 'sufy1234456' })
        let test2 = await requester.post('/login').set('Content-Type', 'application/json').send({ username: 'kashish', password: 'sufy1234456' })
        let token = test2.body.token
        let test3 = await requester.post('/profile').set('Authorization', `Bearer ${token}`).send({ name: 'shehzad yousaf', zipcode: '77498', state: 'TX', address: '11324 apple hill', city: 'austin' })
        let test4 = await requester.post('/submitQuotes').set('Authorization', `Bearer ${token}`).send({DeliveryDate:new Date(),SuggestedPrice:1.71,TotalPrice:200,Gallons:50})

        chai.expect(test.statusCode).to.equal(200)
        chai.expect(test2.statusCode).to.equal(200)
        chai.expect(test3.statusCode).to.equal(200)
        chai.expect(test4.statusCode).to.equal(200)
       
    }
    finally {
        requester.close()
    }
})
    
    
    

})

