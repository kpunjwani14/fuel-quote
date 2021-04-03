const assert = require('chai').assert
let chai = require('chai')
let chaiHttp = require("chai-http");
var request = require('supertest');
var app = require('../server/index.js')

describe('App',()=>{
    it('app should register client', (done)=>{
        
          request(app).post('/register').send({RegisterUsername:'sufyarny',RegisterPassword:'super123'}).expect(200).end((err,res)=>{
            if(err)
                return done(err)
            done()
        
        })
            
            
            
    })
    it('app should not allow duplicate registration',(done)=>{
         request(app).post('/register').set('Content-Type','application/json').send({RegisterUsername:'shehzman',RegisterPassword:'shehzman2000'}).expect(400).end((err,res)=>{
           
            
            if(err)
                 return done(err)
            //assert.equal(res.status,400)
             done()
        
            });
    })
    it('app should allow login of user',(done)=>{
         request(app).post('/login').set('Content-Type','application/json').send({username:'shehzman',password:'shehzman2000'}).expect(200).end((err,res)=>{
             if(err)
                return done(err)
           
            done()
        })
    })
    it('app should not login user',(done)=>{
         request(app).post('/login').set('Content-Type','application/json').send({username:'shehzman',password:'suer123'}).expect(401).end((err,res)=>{
            if(err)
               return done(err)
            done()
        })
    }
    )
    it('app should not get user profile',(done)=>{
        
         request(app).get('/profile/2').set('Content-Type','application/json').expect(400).end((err,res)=>{
            if(err)
                return done(err)
            done()
        })
    })
    it('app should get user profile',(done)=>{
         request(app).get('/profile/33').set('Content-Type','application/json').expect(200).end((err,res)=>{
            if(err)
                return done(err)
            done()
        })
    })
    it('app should not change profile',(done)=>{
         request(app).post('/profile/33').set('Content-Type','application/json').send({}).expect(400).end((err,res)=>{
            if(err)
                return done(err)
            done()
        })
    })
    it('app should change profile',(done)=>{
         request(app).post('/profile/33').set('Content-Type','application/json').send({name:'shehzad yousaf', zipcode:'77498',state:'TX',address:'11324 apple hill',city:'austin'}).expect(200).end((err,res)=>{
            if(err)
                return done(err)
            done()
        })
    })
    it('app should get history of quotes',(done)=>{ request(app).get('/showtable/33').expect(200).end((err,res)=>{
        if(err)
            return done(err)
        
        done()
    
    })
        
    })
    it('app should not get history of quotes',(done)=>{
         request(app).get('/showtable/1').expect(401).end((err,res)=>{
            
            
            if(err)
                return done(err)
            done()
        
        })
            
            
            

    })
    it('app should not get profile',(done)=>{
         request(app).get('/profile/100').expect(400).end((err,res)=>{
            if(err)
                return done(err)
            done()
        })
    })
    it('app should get profile',(done)=>{
         request(app).get('/profile/30').expect(200).end((err,res)=>{
             
            if(err)
                return done(err)
            done()
        })
    })
    
    
    

})

