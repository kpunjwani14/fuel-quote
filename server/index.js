const express = require("express");
const jwt = require('jsonwebtoken')
const app = express();
const { sequelize, UserCredentials, ClientInformation, FuelQuote } = require('../models')
const cors = require("cors");
const { body, validationResult, check } = require('express-validator');
const passport = require('passport')
app.use(cors());
app.use(express.json());
app.use(passport.initialize())


const auth = (req, res, next) => {
  let token = req.headers.authorization
  if (!token || token == '')
    return res.status(401).send()
  token = token.split(' ')
  if (!token[1])
    return res.status(401).send()
  jwt.verify(token[1], 'hellosecret', async (err, user) => {

    if (err)
      return res.status(403).send()
    let checkUser = await UserCredentials.findOne({where:{userId:user.id}})
    if(checkUser == null)
      return res.status(401).send()
    req.user = user
    next()
  })
}

const local = require('passport-local').Strategy
start(passport)
function start(pass) {
  pass.use(new local(async (username, password, done) => {
    const user = await UserCredentials.findOne({ where: { Username: username, Password: password } })
    if (user == null)
      return done(null, false, { message: 'Credentials Do Not Match Any Current Users' })

    let result = jwt.sign({ username: user.dataValues.Username, id: user.dataValues.userId }, 'hellosecret', { expiresIn: 3600 })

    return done(null, { token: result, userId: user.dataValues.userId, username: user.dataValues.Username })

  }))
  pass.serializeUser((user, done) => {
    return done(null, user.userId)

  })
  pass.deserializeUser(async (id, done) => {
    const user = await UserCredentials.findOne({ where: { userId: id } })
    return done(null, user)

  })
}
app.get('/profile', auth, async (req, res) => {

  const user = await ClientInformation.findOne({ where: { UserId: req.user.id } })
  

  res.send({ name: user.Name, address: user.Address1, address2: user.Address2, city: user.City, state: user.State, zipcode: user.ZipCode })
})

app.post('/login', passport.authenticate('local'), (req, res) => {

  res.send(req.user)
})


app.get('/getPrice', auth, async (req, res) => {

  let userData = await ClientInformation.findOne({ where: { UserId: req.user.id }, include: FuelQuote })
  userData = userData.dataValues
  let margin = 1.50 * (((userData.State == 'TX' ? 2 : 4) - (userData.FuelQuotes.length > 0 ? 1 : 0) + (req.query.gallonsRequested > 1000 ? 2 : 3) + 10) * .01)
  res.send({ margin: margin, suggestedPricePerGallon: 1.50 + margin, totalAmountDue: (1.50 + margin) * req.query.gallonsRequested })



})

app.post('/submitQuotes', auth, async (req, res) => {
  let { DeliveryDate, SuggestedPrice, TotalPrice,Gallons } = req.body
  try {
    let ClientId = await ClientInformation.findOne({ attributes: ['ClientId','Address1'], where: { UserId: req.user.id } })
    ClientId = ClientId.dataValues
    await FuelQuote.create({ DeliveryDate, SuggestedPrice, TotalPrice, ClientId:ClientId.ClientId,Gallons,DeliveryAddress:ClientId.Address1 })
    res.send('uploaded quote')
  }
  catch (e) {
    console.log(e)
  }
})

app.get("/showTable", auth, async (req, res) => {

  const user = await ClientInformation.findOne({ where: { UserId: req.user.id }, include: FuelQuote })


  res.send(user.dataValues.FuelQuotes)
});

app.post('/profile', auth, check('name').isLength({ min: 1, max: 50 }), check('address').isLength({ min: 10, max: 100 }), check('city').isLength({ min: 1, max: 100 }), check('state').isLength({ min: 1, max: 2 }), check('zipcode').isLength({ min: 5, max: 9 }), async (req, res) => {


  let user = await ClientInformation.findOne({ where: { UserId: req.user.id } })
  const { name, address, address2, city, state, zipcode } = req.body
  const error = validationResult(req)
  if (!error.isEmpty()) {
    return res.status(400).json(error.array())
  }

  await user.update({ Name: name, Address1: address, Address2: address2, City: city, State: state, ZipCode: zipcode })
  res.send('done')

})

app.post('/register', check('RegisterUsername', 'No Username Provided').notEmpty().custom(async val => {

  let res = await UserCredentials.findOne({ where: { username: val } })
  if (res != null) {
    return Promise.reject()
  }

}).withMessage('Username Already Exists'), check('RegisterPassword', 'No Password Provided').notEmpty(), async (req, res) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {

    return res.status(400).json(error.array())
  }
  try {

    const result = await UserCredentials.create({
      Username: req.body.RegisterUsername,
      Password: req.body.RegisterPassword,
      ClientInformation: {
      }
    },
      {
        include: [{ association: UserCredentials.Info }]
      })



  }
  catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }

  return res.send('Successful Register!')
})

app.delete('/deleteAll', async (req, res) => {

  await FuelQuote.destroy({ where: {} })
  await ClientInformation.destroy({ where: {} })
  await UserCredentials.destroy({ where: {} })
  res.send('done')
})

app.get('/auth', auth, (req, res) => res.send('authenticated'))



app.listen(3001, () => {
  console.log("works on 3001!");
  sequelize.authenticate()
});

module.exports = app



