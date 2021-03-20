const assert = require('chai').assert
var request = require('supertest');
var app = require('../server/index.js')
describe('App',()=>{
    it('app should register client', ()=>{
        
         request(app).post('/register').set('Content-Type','application/json').send({RegisterUsername:'shehzman',RegisterPassword:'super123'}).expect(200,(err,res)=>{
            assert.equal(res.status,200)});
    })
    it('app should not allow duplicate registration',()=>{
        request(app).post('/register').set('Content-Type','application/json').send({RegisterUsername:'shehzman',RegisterPassword:'super123'}).expect(400,(err,res)=>{
            assert.equal(res.status,400)
        });
    })
    it('app should allow login of user',()=>{
        request(app).post('/login').set('Content-Type','application/json').send({username:'shehzman',password:'super123'}).expect(200,(err,res)=>{
            assert.equal(res.status,200)
        })
    })
    it('app should not login user',()=>{
        request(app).post('/login').set('Content-Type','application/json').send({username:'shehzman',password:'suer123'}).expect(200,(err,res)=>{
            assert.equal(res.status,401)
        })
    }
    )
    it('app should not get user profile',()=>{
        request(app).get('/profile/2').set('Content-Type','application/json').expect(400,(err,res)=>{
            assert.equal(res.status,400)
        })
    })
    it('app should get user profile',()=>{
        request(app).get('/profile/0').set('Content-Type','application/json').expect(200,(err,res)=>{
            assert.equal(res.status,200)
        })
    })
    it('app should not change profile',()=>{
        request(app).post('/profile/0').set('Content-Type','application/json').expect(200,(err,res)=>{
            assert.equal(res.status,200)
        })
    })

})