var koa = require('koa')

// Middleware and helpers
var path = require('path')
var compress = require('koa-compress')
var session = require('koa-generic-session')
var MongoStore = require('koa-generic-session-mongo')
var RethinkSession = require('koa-generic-session-rethinkdb')
var serve = require('koa-static')
var parse = require('koa-bodyparser')
var views = require('koa-views')
var router = require('koa-router')()
var logger = require('koa-logger')
var favicon = require('koa-favicon')
var mongoose = require('mongoose')
var passport = require('koa-passport')
var agenda = require('./services/agenda-service')

// Import configs and auth middleware
var config = require('./config')
var auth = require('./auth/auth')

// Import routes
var index = require('./routes/index')
var users = require('./routes/users')
var sessions = require('./routes/sessions')

// Rethinkdbdash
const r = require(path.join(__dirname, '/r'))

var app = koa()

auth()
mongoose.connect(config.mongoUri)

// Set up Rethinkdb session store
var sessionStore = new RethinkSession({
  connection: r,
  db: config.rethinkSession.db,
  table: config.rethinkSession.table
})
sessionStore.setup()

// Logger
app.use(logger())

// Compression
app.use(compress(config.compress))

// Sessions
app.keys = ['suzy eats a suzy snack']
app.use(session({
  key: 'koa.sid',
  cookie: {
    maxAge: null,
    signed: false
  },
  store: sessionStore
}))

// Bodyparser
app.use(parse())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Initialize Agenda
agenda.on('ready', function () {
  agenda.cancel({
    name: 'Agenda running'
  })
  agenda.start()
})

// Views
app.use(views(path.join(__dirname, 'views'), {
  extension: 'jade'
}))

// Serve static
app.use(serve(path.join(__dirname, 'public')))

// Routes
router.get('/', index.index)
router.redirect('/app', '/')
router.redirect('/login', '/')
router.redirect('/create', '/')
router.redirect('/reset', '/')
router.redirect('/forgot', '/')
router.get('/404', index.fourOhFour)
router.get('/sessions/get', sessions.get)
router.post('/users/login', users.setCookieAge, users.login)
router.put('/users/create', users.setCookieAge, users.create)
router.post('/users/write', users.write)
router.post('/users/forgot', users.forgot)
router.post('/users/reset', users.reset)
router.get('/users/logout', users.logout)
app.use(router.routes())
app.use(router.allowedMethods())

// 404
app.use(function * (next) {
  if (this.status === 404) {
    this.redirect('/404')
  }
  yield next
})

r.init(config.rethinkdb, [
  {
    name: 'sessions',
    indexes: ['dateCreated', 'sid']
  },
  {
    name: 'lists',
    indexes: ['dateCreated']
  },
  {
    name: 'users',
    indexes: ['dateCreated']
  }
])
.then(() => {
  console.log('DB, tables, and index are available, starting koa...')
  startKoa()
})

function startKoa () {
  app.listen(config.koa.port)
  console.log('Listening on port ' + config.koa.port)
}
