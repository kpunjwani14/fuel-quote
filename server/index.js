const express = require("express");
const app = express();
const { sequelize, UserCredentials,ClientInformation } = require('../models')
//const mysql = require('mysql');
const cors = require("cors");
const { body, validationResult, check } = require('express-validator');
const passport = require('passport')
const session = require('express-session')
app.use(cors());
app.use(session({
  secret: 'hello_world',
  resave: false,
  saveUninitialized: false
}))
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
var users = []
var ids = 0

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
function start(pass) {
  pass.use(new local(async (username, password, done) => {
    const user = await UserCredentials.findOne({where:{Username:username,Password:password}})
    
    if (user == null)
      return done(null, false, { message: 'Credentials Do Not Match Any Current Users' })
    return done(null, user.dataValues)

  }))
  pass.serializeUser((user, done) => {
  
    return done(null, user.userId)


  })
  pass.deserializeUser(async (id, done) => {
    const user = await UserCredentials.findOne({where:{userId:id}})
    return done(null, user)

  })
}
app.get('/profile/:id', async (req, res) => {
  console.log(req.params.id)
  const user = ClientInformation.findOne({where:{ClientId:req.params.id}} )
  if (user == null) {

    return res.status(400).json({ message: 'invalid profile' })
  }
  res.send(user)
})

app.post('/login', passport.authenticate('local'), (req, res) => {

  res.send({ id: req.user.userId })
})


// app.post('/create', (req, res) => {
//     const gallons_requested = req.body.gallons_requested;
//     const delivery_address = req.body.delivery_address;
//     const delivery_date = req.body.delivery_date;
//     const suggested_price = req.body.suggested_price;
//     const total_price = req.body.total_price;

//     // db.query(
//     //     'INSERT INTO sys.quote_history (gallons_requested, delivery_address, delivery_date, suggested_price, total_price) VALUES (?,?,?,?,?)' 
//     //     [gallons_requested, delivery_address, delivery_date, suggested_price, total_price],
//     //     (err, result) => {
//     //         if (err){
//     //             console.log(err);
//     //         } else{
//     //             res.send("values inserted");
//     //         }
//     //     }
//     // );
// });
//empty for pricing module 
app.post('/getPrice', (req, res) => {
  res.send('Implementing in Next Assignment')
})
app.get("/showtable/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id)

  if (user == null)
    return res.status(401).json({ message: 'unauthorized' })

  res.send(user.quoteHistory)
});

app.post('/profile/:id', check('name').isLength({ min: 1, max: 50 }), check('address').isLength({ min: 10, max: 100 }), check('city').isLength({ min: 1, max: 100 }), check('state').isLength({ min: 1, max: 2 }), check('zipcode').isLength({ min: 5, max: 9 }), async (req, res) => {
  
  let user = await ClientInformation.findOne({where:{UserId:req.params.id}})
  const { name, address, address2, city, state, zipcode } = req.body
  if (user == null)
    return res.status(401).json({ message: 'unauthorized' })
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json(error.array())
  }
  
  await user.update({ Name:name, Address1:address,Address2:address2,City:city,State:state,ZipCode:zipcode })
  res.send('done')

})

app.post('/register', check('RegisterUsername', 'No Username Provided').notEmpty().custom(async val => {
  
  let res = await UserCredentials.findOne({where: {username: val}})
  if(res != null){
    return Promise.reject()
  }
  
}).withMessage('Username Already Exists'), check('RegisterPassword', 'No Password Provided').notEmpty(), async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {

    return res.status(400).json(error.array())
  }
  try {
    const res = await UserCredentials.create({ Username: req.body.RegisterUsername, Password: req.body.RegisterPassword })
    const x= await ClientInformation.create({UserId:res.dataValues.userId})

  }
  catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }

  return res.send('Successful Register!')
})

app.listen(3001, () => {
  console.log("works on 3001!");
  sequelize.authenticate()
});

module.exports = app



