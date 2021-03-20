const express = require("express");
const app = express();
//const mysql = require('mysql');
const cors = require("cors");
const { body, validationResult, check} = require('express-validator');
const passport = require('passport')
const session = require('express-session')
app.use(cors());
app.use(session({
  secret:'hello_world',
  resave: false,
  saveUninitialized: false
}))
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
var users = []
var ids=0

// change stuff here to make it connect to your localhost db 
// const db = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     host: 'localhost',
//     password: '00000000',
//     database: 'sys',
// });
const local = require('passport-local').Strategy
start(passport)
function start(pass){
    pass.use(new local((username,password,done)=>{
      
        const user = users.find(u=>u.username ===  username && u.password === password)
       
        if(user == null )
          return done(null,false,{message:'Credentials Do Not Match Any Current Users'})
        return done(null,user)

    }))
    pass.serializeUser((user,done)=>{
      
      return done(null,user.id)
      
      
    })
    pass.deserializeUser((id,done)=>{
      
      return done(null,users.find(u=>u.id===id))
      
    })
}
app.get('/profile/:id',(req,res)=>{
  console.log(req.params.id)
  const user =users.find(u=>u.id==req.params.id)
  if(user == null){
    
    return res.status(400).json({message:'invalid profile'})
  }
  res.send(user)
})

app.post('/login',passport.authenticate('local'),(req,res)=>{
  
    console.log(req.user.id)
    res.send({id:req.user.id}) 
})


app.post('/create', (req, res) => {
    const gallons_requested = req.body.gallons_requested;
    const delivery_address = req.body.delivery_address;
    const delivery_date = req.body.delivery_date;
    const suggested_price = req.body.suggested_price;
    const total_price = req.body.total_price;

    // db.query(
    //     'INSERT INTO sys.quote_history (gallons_requested, delivery_address, delivery_date, suggested_price, total_price) VALUES (?,?,?,?,?)' 
    //     [gallons_requested, delivery_address, delivery_date, suggested_price, total_price],
    //     (err, result) => {
    //         if (err){
    //             console.log(err);
    //         } else{
    //             res.send("values inserted");
    //         }
    //     }
    // );
});
//empty for pricing module 
app.post('/getPrice',(req,res)=>{
  res.send('Implementing in Next Assignment')
})
app.get("/showtable/:id", (req, res) => {
    const user =users.find(u=>u.id==req.params.id)

    if(user==null)
      return res.status(401).json({message:'unauthorized'})
    // db.query("SELECT * FROM sys.quote_history", (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // console.log(result);
    //     res.send(result);
    //   }
    // });
    res.send(user.quoteHistory)
  });
  app.post('/profile/:id',check('name').isLength({min:1, max:50}),check('address').isLength({min:10,max:100}),check('city').isLength({min:1,max:100}),check('state').isLength({min:1,max:2}),check('zipcode').isLength({min:5,max:9}),(req,res)=>{
    let user=users.findIndex(u=>u.id==req.params.id)
    console.log(user)
    const {name,address,address2,city,state,zipcode}=req.body
    if(user==-1)
      return res.status(401).json({message:'unauthorized'})
    const error = validationResult(req)
    if(!error.isEmpty()){
      
      return res.status(400).json(error.array())
    }
    users[user]={...users[user],name,address,address2,city,state,zipcode}
  })

  app.post('/register',check('RegisterUsername','No Username Provided').notEmpty().custom(val=>users.find(u=>u.username === val) == null ).withMessage('Username Already Exists'),check('RegisterPassword', 'No Password Provided').notEmpty(),(req,res)=>{
    const error = validationResult(req)
    console.log(req.body.RegisterUsername)
    console.log(req.body.RegisterPassword)
    if(!error.isEmpty()){
      
      return res.status(400).json(error.array())
    }
    users.push({
      username: req.body.RegisterUsername, 
      password:req.body.RegisterPassword,
      name:null,
      address:null,
      address2:null,
      city:null,
      state:null,
      zipcode:null,
      quoteHistory:[{gallons_requested:5,delivery_address:'11453 Chicago Lane',delivery_date:'5-1-21',suggested_price:120,total_price:240},{gallons_requested:8,delivery_address:'11453 Apple Lane',delivery_date:'5-12-21',suggested_price:450,total_price:650}],
      id: ids++
    
    }),
      

    res.send('Successful Register!')
  })

app.listen(3001, () =>{
    console.log("works on 3001!");
});

module.exports=app



