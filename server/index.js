const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('data/transactions.json')
const users = require('./data/users.json')
const passport = require('passport')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy

server.use(jsonServer.defaults())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(passport.initialize())

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
  }, (username, password, done) => {
    const foundUser = users.find(
      u => u.username === username && u.password === password
    )

    return done(null, !!foundUser && foundUser)
  }
))

passport.serializeUser((user, done) =>
  done(null, user.id)
)

passport.deserializeUser((id, done) =>
  done(err, user.find(u => u.id === id))
)

server.post('/login', passport.authenticate('local'),
  (req, res) => {
    const { password, ...user } = req.user

    res.json(user)
  }
)

server.use(router)
server.listen(3005, () => {
  console.log('JSON Server is running on port 3005')
})
