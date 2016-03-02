var koa = require('koa')

// Middleware and helpers
var path = require('path')
var compress = require('koa-compress')
var session = require('koa-generic-session')
var MongoStore = require('koa-generic-session-mongo')
var serve = require('koa-static')
var parse = require('koa-bodyparser')
var views = require('koa-views')
var router = require('koa-router')()
var logger = require('koa-logger')
var favicon = require('koa-favicon')
var flash = require('koa-flash')
var mongoose = require('mongoose')
var passport = require('koa-passport')
var agenda = require('./services/agenda')

// Import configs and auth middleware
var config = require('./config')
var passportConfig = require('./auth/passport-config')
var restrict = require('./auth/restrict')

// Import routes
var index = require('./routes/index')
var users = require('./routes/users')
var sessions = require('./routes/sessions')

var app = koa()

passportConfig()
mongoose.connect(config.mongoUri)

// Logger
app.use(logger())

// Compression
app.use(compress(config.compress))

// Sessions
app.keys = ['suzy eats a suzy snack']
app.use(session({
  key: 'koa.sid',
  cookie: {
    maxAge: null
  },
  store: new MongoStore({
    url: config.mongoUri,
    collection: 'sessions'
  })
}))

app.use(function * (next) {
  // ignore favicon
  if (this.path === '/favicon.ico') return

  var n = this.session.views || 0
  this.session.views = ++n

  yield next
})

// Bodyparser
app.use(parse())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')))

// Flash
app.use(flash())

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Views
app.use(views(path.join(__dirname, 'views'), {
  extension: 'jade'
}))

// Serve static
app.use(serve(path.join(__dirname, 'public')))

// Routes
router.get('/', index.index)
router.get('/sessions/get', sessions.get)
router.post('/users/login', users.setCookieAge, users.login)
router.put('/users/create', users.setCookieAge, users.create)
router.post('/users/forgot', users.forgot)
router.post('/users/reset', users.reset)
router.post('/users/write', users.write)
router.post('/users/logout', users.logout)
app.use(router.routes())

// Initialize Agenda
agenda.on('ready', function () {
  agenda.cancel({
    name: 'Agenda running'
  })
  agenda.start()
})

// app.use(restrict)

// catch 404 and forward to error handler
// app.use(function * (next) {
//   this.throw(404, 'The page you\'re looking for does not exist.')
//   yield next
// })

// error handlers

// development error handler
// will print stacktrace
// if (app.env === 'development') {
//   app.use(function * () {
//     this.response.statusCode = this.response.statusCode || 500)
//     this.body = {
//       error: {
//         message: err.message,
//         error: err
//       }
//     }
//   })
// }

// production error handler
// no stacktraces leaked to user
// app.use(function * () {
//   this.response.statusCode = this.response.statusCode || 500)
//   this.body = {
//     error: {
//       status: err.status,
//       message: err.message,
//       error: err
//     }
//   }
// })

app.listen(config.koa.port)
console.log('Listening on port ' + config.koa.port)

module.exports = app
