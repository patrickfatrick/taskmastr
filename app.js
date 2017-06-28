'use strict'

const http = require('http')
const Koa = require('koa')
const convert = require('koa-convert')
const chalk = require('chalk')

// Middleware and helpers
const path = require('path')
const compress = require('koa-compress')
const session = require('koa-generic-session')
const mongoose = require('mongoose')
const MongoStore = require('koa-generic-session-mongo')
const serve = require('koa-static')
const parse = require('koa-bodyparser')
const views = require('koa-views')
const router = require('koa-router')()
const favicon = require('koa-favicon')
const passport = require('koa-passport')
const createLogger = require('concurrency-logger').default
const agenda = require('./services/agenda-service')
const filterLog = require('./utils/filter-log')

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

const app = new Koa()

auth()

// Bodyparser
app.use(parse())

// Logger
app.use(createLogger({
  req: (ctx) => {
    return chalk.gray(ctx.originalUrl) + ' ' +
    (ctx.method === 'POST' && !process.env.QUIET ? filterLog(ctx.request.body) : '')
  },
  res: (ctx) => (
    chalk.gray(ctx.originalUrl) + ' ' +
    (ctx.response.header['content-length'] ? ctx.response.header['content-length'] + 'b ' : '') +
    (ctx.method === 'POST' && !process.env.QUIET ? filterLog(ctx.body) : '')
  )
}))

// Mongoose setup
// Still uses mpromise by default, so manually set it to native Promise
mongoose.Promise = global.Promise
mongoose.connect(config.mongoose.url)

// Compression
app.use(compress(config.compress))

// Sessions
app.keys = ['suzy eats a suzy snack']
app.use(convert(session({
  key: 'koa.sid',
  cookie: {
    maxAge: null,
    signed: false
  },
  store: new MongoStore(config.session)
})))

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
  extension: 'pug'
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
app.use(async function (ctx, next) {
  if (ctx.status === 404) {
    ctx.redirect('/404')
  }
  await next
})

// Attach socket.io instance to app
const server = http.createServer(app.callback())
io.attach(server)

server.listen(config.koa.port)
console.log('Listening on port ' + config.koa.port)
