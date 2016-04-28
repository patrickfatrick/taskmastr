'use strict'

const koa = require('koa')

// Middleware and helpers
const path = require('path')
const compress = require('koa-compress')
const session = require('koa-generic-session')
const RethinkSession = require('koa-generic-session-rethinkdb')
const serve = require('koa-static')
const parse = require('koa-bodyparser')
const views = require('koa-views')
const router = require('koa-router')()
const logger = require('koa-logger')
const favicon = require('koa-favicon')
const passport = require('koa-passport')
const agenda = require('./services/agenda-service')

// Import configs and auth middleware
const config = require('./config')
const auth = require('./auth/auth')

// Socket.io instance
const io = require('./io')

// Import routes
const index = require('./routes/index')
const users = require('./routes/users')
const lists = require('./routes/lists')
const items = require('./routes/items')
const sessions = require('./routes/sessions')

// Rethinkdb instance
const r = require('./thinky').r

const app = koa()

auth()

// Set up Rethinkdb session store
const sessionStore = new RethinkSession({
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

// Favicon
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
app.use(serve(path.join(__dirname, 'public'), config.static))

// Routes
router.get('/', index.index)
router.redirect('/app', '/')
router.redirect('/login', '/')
router.redirect('/create', '/')
router.redirect('/reset', '/')
router.redirect('/forgot', '/')
router.get('/404', index.fourOhFour)
router.get('/sessions', sessions.get)
router.post('/users/login', users.setCookieAge, users.login)
router.put('/users/create', users.setCookieAge, users.create)
router.post('/users/:username/update', users.update)
router.post('/users/:username/forgot', users.forgot)
router.post('/users/reset', users.reset)
router.get('/users/logout', users.logout)
router.get('/lists/:listid', lists.get)
router.put('/lists/create', lists.create)
router.delete('/lists/:listid/delete', lists.delete)
router.post('/lists/:listid/update', lists.update)
router.put('/lists/:listid/items/create', items.create)
router.post('/lists/:listid/items/:itemid/update', items.update)
router.delete('/lists/:listid/items/:itemid/delete', items.delete)
app.use(router.routes())
app.use(router.allowedMethods())

// 404
app.use(function * (next) {
  if (this.status === 404) {
    this.redirect('/404')
  }
  yield next
})

// Create session table, start up Koa when it's been made.
r.table('sessions').indexWait('sid').run()
.then(() => {
  console.log('DB, tables, and index are available, starting koa...')
  startKoa()
})
.catch(() => {
  r.tableCreate('sessions').run()
  .then(() => {
    r.table('sessions').indexCreate('sid').run()
    .then(() => {
      console.log('DB, tables, and index are available, starting koa...')
      startKoa()
    })
  })
})

function startKoa () {
  // Attach socket.io instance to app
  io.attach(app)

  app.listen(config.koa.port)
  console.log('Listening on port ' + config.koa.port)
}
